// src/data/dataFetcher.ts
import axios from "../../lib/axios"
import { Stats, Property, UsersData, Notification, ActivityLog } from '@/types/admin';

// Helper function to log API errors clearly
const logError = (endpoint: string, error: any) => {
  console.log(`❌ API Error for ${endpoint}:`);
  console.log('-> Error Message:', error.message);
  console.log('-> Status Code:', error.response?.status);
  console.log('-> Response Data:', error.response?.data);
  console.log('-> Full Error:', error);
};

export const fetchStats = async (): Promise<Stats> => {
  console.log('🔵 Starting to fetch stats...');
  
  try {
    console.log('1. Fetching properties...');
    const propertyRes = await axios.get('/property/allproperty');
    console.log('✅ Properties data:', propertyRes.data);

    console.log('2. Fetching owners...');
    const ownersRes = await axios.get('/admin/users/owner'); // Changed endpoint
    console.log('✅ Owners data:', ownersRes.data);

    console.log('3. Fetching tenants...');
    const tenantsRes = await axios.get('/admin/users/tenant'); // Changed endpoint
    console.log('✅ Tenants data:', tenantsRes.data);

    return {
      totalProperties: propertyRes.data.totalItems || 0,
      totalOwners: ownersRes.data?.data?.length || 0,
      totalTenants: tenantsRes.data?.data?.length || 0,
      activeRentals: 0,
      monthlyRevenue: 0
    };
  } catch (error) {
    logError('fetchStats', error);
    return {
      totalProperties: 0,
      totalOwners: 0,
      totalTenants: 0,
      activeRentals: 0,
      monthlyRevenue: 0
    };
  }
};

export const fetchProperties = async (): Promise<Property[]> => {
  console.log('🔵 Fetching properties...');
  
  try {
    const res = await axios.get('/property/allproperty');
    console.log('✅ Properties response:', res.data);
    
    if (!res.data?.data) {
      console.warn('⚠️ No data property in response');
      return [];
    }

    return res.data.data.map((p: any) => ({
      id: p._id,
      name: p.propertyName,
      type: p.propertyType,
      address: p.address,
      location: p.address, // Using address as location display
      coordinates: p.location?.coordinates || [0, 0],
      rent: p.monthlyRent,
      isAvailable: p.isAvailable,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      description: p.description,
      amenities: p.amenities || [],
      furnishing: p.furnishing,
      images: p.images || [],
      securityDeposit: p.securityDeposit,
      utilitiesIncluded: p.utilitiesIncluded,
      availableFrom: p.availableFrom ? new Date(p.availableFrom).toLocaleDateString() : 'N/A',
      minimumStay: p.minimumStay,
      leaseTerms: p.leaseTerms,
      guidelines: p.guidelines || [],
      requiredDocuments: p.requiredDocuments || []
    }));
  } catch (error) {
    logError('fetchProperties', error);
    return [];
  }
};

export const fetchUsers = async (): Promise<UsersData> => {
  console.log('🔵 Fetching users...');
  
  try {
    console.log('1. Fetching owners...');
    const ownersRes = await axios.get('/admin/users/owner'); // Changed endpoint
    console.log('✅ Owners response:', ownersRes.data);

    console.log('2. Fetching tenants...');
    const tenantsRes = await axios.get('/admin/users/tenant'); // Changed endpoint
    console.log('✅ Tenants response:', tenantsRes.data);

    return {
      owners: ownersRes.data?.data?.map((o: any) => ({
        id: o._id,
        name: o.name,
        email: o.email,
        verified: o.verified || false,
        properties: o.properties?.length || 0,
        joined: new Date(o.createdAt).toISOString().split('T')[0]
      })) || [],
      tenants: tenantsRes.data?.data?.map((t: any) => ({
        id: t._id,
        name: t.name,
        email: t.email,
        verified: t.verified || false,
        currentRental: t.currentRental?.propertyName || null,
        joined: new Date(t.createdAt).toISOString().split('T')[0]
      })) || []
    };
  } catch (error) {
    logError('fetchUsers', error);
    return { owners: [], tenants: [] };
  }
};

// KEEPING ALL YOUR DUMMY CONTENT EXACTLY AS IS
export const mockNotifications: Notification[] = [
  { id: 1, type: 'property', message: 'New property "Seaside Villa" needs approval', time: '2 hours ago' },
  { id: 2, type: 'owner', message: 'Owner verification request from "David Kumar"', time: '5 hours ago' },
  { id: 3, type: 'property', message: 'Property report for "Downtown Loft" needs review', time: '1 day ago' }
];

export const mockActivityLog: ActivityLog[] = [
  { id: 1, admin: 'Admin User', action: 'Approved property "Luxury Villa Marina"', time: '10:30 AM', date: 'Today' },
  { id: 2, admin: 'Super Admin', action: 'Rejected owner verification for "Fake Account"', time: '09:15 AM', date: 'Today' },
  { id: 3, admin: 'Admin User', action: 'Updated platform commission rate to 8%', time: '04:45 PM', date: 'Yesterday' }
];
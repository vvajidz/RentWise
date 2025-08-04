"use client"

import React, { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Home, Bed, Bath, Square, Building, Zap, Wifi, Car, Dog, Shield, TreePine, Waves, Users, Camera, Plus, X } from 'lucide-react';

interface FormData {
  propertyName: string;
  propertyType: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  images: string[];
  monthlyRent: number;
  securityDeposit: number;
  utilitiesIncluded: boolean;
  availableFrom: string;
  minimumStay: number;
  leaseTerms: number;
  amenities: string[];
  guidelines: string[];
  requiredDocuments: string[];
  description: string;
  bathrooms: number;
  bedrooms: number;
  totalFloors: number;
  furnishing: "unfurnished" | "semi-furnished" | "fully-furnished";
}

const PropertyForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newGuideline, setNewGuideline] = useState('');
  const [newDocument, setNewDocument] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    propertyType: 'Apartment',
    address: '',
    location: {
      type: "Point",
      coordinates: [0, 0]
    },
    images: [],
    monthlyRent: 0,
    securityDeposit: 0,
    utilitiesIncluded: false,
    availableFrom: new Date().toISOString().split('T')[0],
    minimumStay: 1,
    leaseTerms: 12,
    amenities: [],
    guidelines: [],
    requiredDocuments: [],
    description: '',
    bathrooms: 1,
    bedrooms: 1,
    totalFloors: 1,
    furnishing: 'unfurnished'
  });

  const propertyTypes = [
    'Apartment', 'Condo', 'House', 'Studio', 'Townhouse', 'Loft', 'Villa'
  ];

  const standardAmenities = [
    { id: 'AC', label: 'Air Conditioning', icon: Zap },
    { id: 'WiFi', label: 'High-Speed WiFi', icon: Wifi },
    { id: 'Parking', label: 'Parking Space', icon: Car },
    { id: 'Pet Friendly', label: 'Pet Friendly', icon: Dog },
    { id: 'Swimming Pool', label: 'Swimming Pool', icon: Waves },
    { id: 'Security', label: '24/7 Security', icon: Shield },
    { id: 'Furnished', label: 'Furnished', icon: Home },
    { id: 'Balcony', label: 'Balcony', icon: TreePine },
    { id: 'Gym', label: 'Gym Access', icon: Users }
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCoordinateChange = (index: 0 | 1, value: number) => {
    const newCoordinates = [...formData.location.coordinates] as [number, number];
    newCoordinates[index] = value;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: newCoordinates
      }
    }));
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image !== imageToRemove)
    }));
  };

  const addGuideline = () => {
    if (newGuideline.trim()) {
      setFormData(prev => ({
        ...prev,
        guidelines: [...prev.guidelines, newGuideline.trim()]
      }));
      setNewGuideline('');
    }
  };

  const removeGuideline = (index: number) => {
    setFormData(prev => ({
      ...prev,
      guidelines: prev.guidelines.filter((_, i) => i !== index)
    }));
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData(prev => ({
        ...prev,
        requiredDocuments: [...prev.requiredDocuments, newDocument.trim()]
      }));
      setNewDocument('');
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((_, i) => i !== index)
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const submissionData = {
      ...formData,
      availableFrom: new Date(formData.availableFrom),
      monthlyRent: Number(formData.monthlyRent),
      securityDeposit: Number(formData.securityDeposit),
      bathrooms: Number(formData.bathrooms),
      bedrooms: Number(formData.bedrooms),
      totalFloors: Number(formData.totalFloors),
    };

    const response = await axios.post('/property/createproperty', submissionData);
    console.log('✅ Property created:', response.data);
    router.push('/all-properties');
  } catch (err) {
    console.error('❌ Submission error:', err);
    setError('Failed to create property. Please check all fields and try again.');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="border-b pb-6">
            <h1 className="text-2xl font-bold text-gray-800">List Your Property</h1>
            <p className="text-gray-600">Fill in the details to create your property listing</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">
              {error}
            </div>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Name*</label>
                <input
                  type="text"
                  value={formData.propertyName}
                  onChange={(e) => handleInputChange('propertyName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type*</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude*</label>
                <input
                  type="number"
                  step="any"
                  value={formData.location.coordinates[0]}
                  onChange={(e) => handleCoordinateChange(0, parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude*</label>
                <input
                  type="number"
                  step="any"
                  value={formData.location.coordinates[1]}
                  onChange={(e) => handleCoordinateChange(1, parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Property Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Bed className="w-4 h-4 mr-1" /> Bedrooms*
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Bath className="w-4 h-4 mr-1" /> Bathrooms*
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Building className="w-4 h-4 mr-1" /> Total Floors
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalFloors}
                  onChange={(e) => handleInputChange('totalFloors', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Furnishing*</label>
                <select
                  value={formData.furnishing}
                  onChange={(e) => handleInputChange('furnishing', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi-furnished</option>
                  <option value="fully-furnished">Fully-furnished</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Property Images*</h2>
            <div className="flex space-x-2">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
                <Camera className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Add at least one property image</p>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="w-4 h-4 mr-1" /> Monthly Rent*
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.monthlyRent}
                  onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <DollarSign className="w-4 h-4 mr-1" /> Security Deposit*
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.utilitiesIncluded}
                    onChange={(e) => handleInputChange('utilitiesIncluded', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Utilities Included</span>
                </label>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Availability</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-1" /> Available From*
                </label>
                <input
                  type="date"
                  value={formData.availableFrom}
                  onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stay (months)*</label>
                <select
                  value={formData.minimumStay}
                  onChange={(e) => handleInputChange('minimumStay', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {[1, 2, 3, 6, 12].map(months => (
                    <option key={months} value={months}>{months} month{months !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lease Terms (months)*</label>
                <input
                  type="number"
                  min="1"
                  value={formData.leaseTerms}
                  onChange={(e) => handleInputChange('leaseTerms', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {standardAmenities.map((amenity) => {
                const Icon = amenity.icon;
                return (
                  <label key={amenity.id} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity.id)}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">{amenity.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Guidelines */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">House Rules</h2>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newGuideline}
                  onChange={(e) => setNewGuideline(e.target.value)}
                  placeholder="Add a house rule (e.g., No smoking)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addGuideline}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
              {formData.guidelines.length > 0 && (
                <ul className="space-y-2">
                  {formData.guidelines.map((guideline, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <span className="text-sm text-gray-700">{guideline}</span>
                      <button
                        type="button"
                        onClick={() => removeGuideline(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Required Documents */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Required Documents</h2>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newDocument}
                  onChange={(e) => setNewDocument(e.target.value)}
                  placeholder="Add required document (e.g., ID proof)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addDocument}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </button>
              </div>
              {formData.requiredDocuments.length > 0 && (
                <ul className="space-y-2">
                  {formData.requiredDocuments.map((document, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <span className="text-sm text-gray-700">{document}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading || formData.images.length === 0}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(isLoading || formData.images.length === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Publish Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
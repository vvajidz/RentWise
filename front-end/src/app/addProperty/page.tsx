"use client"

import React, { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Home, Bed, Bath, Square, Building, Zap, Wifi, Car, Dog, Shield, TreePine, Waves, Users, Camera, Plus, X, Sparkles, CheckCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium">Property Listing</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              List Your <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Dream Property</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Transform your space into someone's perfect home with our premium listing platform
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <X className="w-5 h-5" />
                  {error}
                </div>
              </div>
            )}

            {/* Basic Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Property Name*</label>
                  <input
                    type="text"
                    value={formData.propertyName}
                    onChange={(e) => handleInputChange('propertyName', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Enter property name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Property Type*</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type} className="bg-slate-800">{type}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Address*</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Enter full address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Longitude*</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location.coordinates[0]}
                    onChange={(e) => handleCoordinateChange(0, parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="0.0000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Latitude*</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location.coordinates[1]}
                    onChange={(e) => handleCoordinateChange(1, parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="0.0000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Property Details</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-300">
                    <Bed className="w-4 h-4 mr-2" /> Bedrooms*
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-300">
                    <Bath className="w-4 h-4 mr-2" /> Bathrooms*
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-300">
                    <Building className="w-4 h-4 mr-2" /> Total Floors
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.totalFloors}
                    onChange={(e) => handleInputChange('totalFloors', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Furnishing*</label>
                  <select
                    value={formData.furnishing}
                    onChange={(e) => handleInputChange('furnishing', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="unfurnished" className="bg-slate-800">Unfurnished</option>
                    <option value="semi-furnished" className="bg-slate-800">Semi-furnished</option>
                    <option value="fully-furnished" className="bg-slate-800">Fully-furnished</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-300">Description*</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="Describe your property's unique features..."
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Property Images*</h2>
              </div>

              <div className="flex gap-3 mb-6">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              
              {formData.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Property ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl border border-white/20"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center">
                  <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-400 text-lg">Add at least one property image</p>
                </div>
              )}
            </div>

            {/* Pricing */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Pricing</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-300">
                    <DollarSign className="w-4 h-4 mr-2" /> Monthly Rent*
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-300">
                    <DollarSign className="w-4 h-4 mr-2" /> Security Deposit*
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.securityDeposit}
                    onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center bg-white/5 p-4 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.utilitiesIncluded}
                      onChange={(e) => handleInputChange('utilitiesIncluded', e.target.checked)}
                      className="w-5 h-5 text-yellow-500 border-white/20 rounded focus:ring-yellow-500 bg-white/10"
                    />
                    <span className="ml-3 text-sm text-slate-300 font-medium">Utilities Included</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Availability</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-slate-300">
                    <Calendar className="w-4 h-4 mr-2" /> Available From*
                  </label>
                  <input
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Minimum Stay (months)*</label>
                  <select
                    value={formData.minimumStay}
                    onChange={(e) => handleInputChange('minimumStay', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    {[1, 2, 3, 6, 12].map(months => (
                      <option key={months} value={months} className="bg-slate-800">{months} month{months !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">Lease Terms (months)*</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.leaseTerms}
                    onChange={(e) => handleInputChange('leaseTerms', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Amenities</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {standardAmenities.map((amenity) => {
                  const Icon = amenity.icon;
                  const isSelected = formData.amenities.includes(amenity.id);
                  return (
                    <label key={amenity.id} className={`flex items-center space-x-3 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-500/40' 
                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                    }`}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleAmenity(amenity.id)}
                        className="w-5 h-5 text-pink-500 border-white/20 rounded focus:ring-pink-500 bg-white/10"
                      />
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-pink-400' : 'text-slate-400'}`} />
                      <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>{amenity.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">House Rules</h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newGuideline}
                    onChange={(e) => setNewGuideline(e.target.value)}
                    placeholder="Add a house rule (e.g., No smoking)"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={addGuideline}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 font-medium"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {formData.guidelines.length > 0 && (
                  <ul className="space-y-3">
                    {formData.guidelines.map((guideline, index) => (
                      <li key={index} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                        <span className="text-slate-300">{guideline}</span>
                        <button
                          type="button"
                          onClick={() => removeGuideline(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
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
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Required Documents</h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    placeholder="Add required document (e.g., ID proof)"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={addDocument}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 font-medium"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                {formData.requiredDocuments.length > 0 && (
                  <ul className="space-y-3">
                    {formData.requiredDocuments.map((document, index) => (
                      <li key={index} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                        <span className="text-slate-300">{document}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
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
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={isLoading || formData.images.length === 0}
                className={`relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 ${
                  (isLoading || formData.images.length === 0)
                    ? 'bg-slate-600 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 hover:from-cyan-600 hover:via-purple-700 hover:to-pink-600 hover:scale-105 shadow-2xl hover:shadow-cyan-500/25'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6" />
                    Publish Property
                  </div>
                )}
              </button>
              
              {formData.images.length === 0 && (
                <p className="text-slate-400 text-sm mt-3">Please add at least one image to publish your property</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
"use client"

import React, { useState } from 'react';
import { Calendar, MapPin, Upload, Plus, X, DollarSign, Home, Bed, Bath, Square, Building, Car, Wifi, Shield, Users, Eye, TreePine, Waves, Zap, Dog, Camera } from 'lucide-react';

interface FormData {
  propertyName: string;
  propertyType: string;
  address: string;
  coordinates: { lng: string; lat: string };
  images: string[];
  monthlyRent: string;
  securityDeposit: string;
  utilitiesIncluded: boolean;
  availableFrom: string;
  minimumStay: number;
  leaseTerms: string;
  amenities: string[];
  guidelines: string[];
  requiredDocuments: string[];
  description: string;
  areaSqFt: string;
  balconyCount: string;
  bathrooms: string;
  bedrooms: string;
  floorNumber: string;
  totalFloors: string;
  furnishing: string;
}

const PropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    propertyType: 'Apartment',
    address: '',
    coordinates: { lng: '', lat: '' },
    images: [],
    monthlyRent: '',
    securityDeposit: '',
    utilitiesIncluded: false,
    availableFrom: '',
    minimumStay: 1,
    leaseTerms: '12',
    amenities: [],
    guidelines: [],
    requiredDocuments: [],
    description: '',
    areaSqFt: '',
    balconyCount: '',
    bathrooms: '',
    bedrooms: '',
    floorNumber: '',
    totalFloors: '',
    furnishing: 'unfurnished'
  });

  const [newGuideline, setNewGuideline] = useState<string>('');
  const [newDocument, setNewDocument] = useState<string>('');
  const [newAmenity, setNewAmenity] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('');

  const propertyTypes = [
    'Apartment', 'Condo', 'House', 'Studio', 'Townhouse', 'Loft', 'Villa'
  ];

  const availableAmenities = [
    { id: 'AC', label: 'Air Conditioning', icon: Zap },
    { id: 'WiFi', label: 'High-Speed WiFi', icon: Wifi },
    { id: 'Parking', label: 'Parking Space', icon: Car },
    { id: 'Pet Friendly', label: 'Pet Friendly', icon: Dog },
    { id: 'Pool Access', label: 'Pool Access', icon: Waves },
    { id: 'Kitchen', label: 'Kitchen', icon: Home },
    { id: '24/7 Security', label: '24/7 Security', icon: Shield },
    { id: 'Furnished', label: 'Furnished', icon: Home },
    { id: 'Balcony', label: 'Balcony', icon: TreePine },
    { id: 'Sea View', label: 'Sea View', icon: Eye }
  ];

  const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCoordinateChange = (type: 'lng' | 'lat', value: string) => {
    setFormData(prev => ({
      ...prev,
      coordinates: {
        ...prev.coordinates,
        [type]: value
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

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenityToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(amenity => amenity !== amenityToRemove)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you would handle the form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Add New Property</h1>
            <p className="text-gray-600 mt-1">Create an exceptional listing to attract quality tenants</p>
          </div>

          <div onSubmit={handleSubmit} className="space-y-8">
            {/* Essential Details */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Essential Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Name
                  </label>
                  <input
                    type="text"
                    value={formData.propertyName}
                    onChange={(e) => handleInputChange('propertyName', e.target.value)}
                    placeholder="Enter property name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => handleInputChange('propertyType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Complete Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter full address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lng}
                    onChange={(e) => handleCoordinateChange('lng', e.target.value)}
                    placeholder="-73.984"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lat}
                    onChange={(e) => handleCoordinateChange('lat', e.target.value)}
                    placeholder="40.7529"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Property Details</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Bed className="w-4 h-4 inline mr-1" />
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Bath className="w-4 h-4 inline mr-1" />
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Square className="w-4 h-4 inline mr-1" />
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    value={formData.areaSqFt}
                    onChange={(e) => handleInputChange('areaSqFt', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <TreePine className="w-4 h-4 inline mr-1" />
                    Balconies
                  </label>
                  <input
                    type="number"
                    value={formData.balconyCount}
                    onChange={(e) => handleInputChange('balconyCount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-1" />
                    Floor Number
                  </label>
                  <input
                    type="number"
                    value={formData.floorNumber}
                    onChange={(e) => handleInputChange('floorNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Floors
                  </label>
                  <input
                    type="number"
                    value={formData.totalFloors}
                    onChange={(e) => handleInputChange('totalFloors', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Furnishing Status
                  </label>
                  <select
                    value={formData.furnishing}
                    onChange={(e) => handleInputChange('furnishing', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi-furnished">Semi-furnished</option>
                    <option value="fully-furnished">Fully-furnished</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                placeholder="Describe your property in detail..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Visual Showcase */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Visual Showcase</h2>
              
              {/* Add Image URL */}
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Enter image URL..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Display Added Images */}
                {formData.images.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Property Images:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={imageUrl}
                              alt={`Property ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY5NzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(imageUrl)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Placeholder when no images */}
                {formData.images.length === 0 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Add property image URLs above</p>
                    <p className="text-sm text-gray-500">Supported formats: JPG, PNG, WebP</p>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing & Terms */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Pricing & Terms</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent ($)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Security Deposit ($)
                  </label>
                  <input
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available From
                  </label>
                  <input
                    type="date"
                    value={formData.availableFrom}
                    onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Stay (months)
                  </label>
                  <select
                    value={formData.minimumStay}
                    onChange={(e) => handleInputChange('minimumStay', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 6, 12].map(months => (
                      <option key={months} value={months}>
                        {months} {months === 1 ? 'month' : 'months'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lease Terms (months)
                  </label>
                  <input
                    type="number"
                    value={formData.leaseTerms}
                    onChange={(e) => handleInputChange('leaseTerms', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.utilitiesIncluded}
                      onChange={(e) => handleInputChange('utilitiesIncluded', e.target.checked)}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Utilities Included</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Premium Amenities */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Premium Amenities</h2>
              
              {/* Predefined Amenities */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {availableAmenities.map((amenity) => {
                  const IconComponent = amenity.icon;
                  return (
                    <label key={amenity.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={formData.amenities.includes(amenity.id)}
                        onChange={() => toggleAmenity(amenity.id)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <IconComponent className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700">{amenity.label}</span>
                    </label>
                  );
                })}
              </div>

              {/* Add Custom Amenity */}
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    placeholder="Add custom amenity..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addAmenity}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Display Selected Amenities */}
                {formData.amenities.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Amenities:</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                          <span>{amenity}</span>
                          <button
                            type="button"
                            onClick={() => removeAmenity(amenity)}
                            className="text-orange-600 hover:text-orange-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Property Guidelines */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Property Guidelines</h2>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newGuideline}
                    onChange={(e) => setNewGuideline(e.target.value)}
                    placeholder="Add a property guideline..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addGuideline}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {formData.guidelines.length > 0 && (
                  <div className="space-y-2">
                    {formData.guidelines.map((guideline, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <span className="text-sm text-gray-700">{guideline}</span>
                        <button
                          type="button"
                          onClick={() => removeGuideline(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Required Documents */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Required Documents</h2>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    placeholder="Add required document..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addDocument}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>

                {formData.requiredDocuments.length > 0 && (
                  <div className="space-y-2">
                    {formData.requiredDocuments.map((document, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <span className="text-sm text-gray-700">{document}</span>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Publish Property
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
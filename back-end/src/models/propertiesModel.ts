import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProperty extends Document {
  propertyName: string;
  propertyType: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  images: string[];
  monthlyRent: number;
  securityDeposit: number;
  utilitiesIncluded: boolean;
  availableFrom: Date;
  minimumStay: number; // in months
  leaseTerms: number; // in months
  amenities: string[];
  guidelines: string[];
  requiredDocuments: string[];
  tenants: Types.ObjectId[];
  isAvailable: boolean;
  description: string;
  areaSqFt: number;
  balconyCount: number;
  bathrooms: number;
  bedrooms: number;
  floorNumber: number;
  totalFloors: number;
  furnishing: "unfurnished" | "semi-furnished" | "fully-furnished" | string;
  createdAt?: Date;
  updatedAt?: Date;
}

const PropertySchema: Schema<IProperty> = new Schema(
  {
    propertyName: { type: String, required: true },
    propertyType: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true }, // [lng, lat]
    },
    images: [{ type: String, required: true }],
    monthlyRent: { type: Number, required: true },
    securityDeposit: { type: Number, required: true },
    utilitiesIncluded: { type: Boolean, default: false },
    availableFrom: { type: Date, required: true },
    minimumStay: { type: Number, default: 1 },
    leaseTerms: { type: Number, default: 12 },
    amenities: [{ type: String }],
    guidelines: [{ type: String }],
    requiredDocuments: [{ type: String }],
    tenants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isAvailable: { type: Boolean, default: true },
    description: { type: String, required: true },
    areaSqFt: { type: Number },
    balconyCount: { type: Number },
    bathrooms: { type: Number },
    bedrooms: { type: Number },
    floorNumber: { type: Number },
    totalFloors: { type: Number },
    furnishing: {
      type: String,
      enum: ["unfurnished", "semi-furnished", "fully-furnished"],
      default: "unfurnished",
    },
  },
  {
    timestamps: true,
  }
);

// For geospatial queries
PropertySchema.index({ location: "2dsphere" });

export default mongoose.model<IProperty>("Property", PropertySchema);

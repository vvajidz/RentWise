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
  tenants: Types.ObjectId[]; // user references
  createdAt?: Date;
  updatedAt?: Date;
}

const PropertySchema: Schema<IProperty> = new Schema(
  {
    propertyName: { type: String, required: true },
    propertyType: { type: String, required: true }, // e.g. "Luxury Apartment"
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
    minimumStay: { type: Number, default: 1 }, // months
    leaseTerms: { type: Number, default: 12 }, // months
    amenities: [{ type: String }],
    guidelines: [{ type: String }],
    requiredDocuments: [{ type: String }],
    tenants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

// For geospatial queries
PropertySchema.index({ location: "2dsphere" });

export default mongoose.model<IProperty>("Property", PropertySchema);

// models/OAuthUser.ts
import mongoose, { Schema, Document } from "mongoose";
import { ROLES, RoleType } from "../constatnts.ts/role";

export interface IOAuthUser extends Document {
  googleId: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: RoleType;
  createdAt?: Date;
  updatedAt?: Date;
}

const OAuthUserSchema: Schema<IOAuthUser> = new Schema(
  {
    googleId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    role: {
      type: String,
      enum: [ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN],
      required: false, // because it will be set after login
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOAuthUser>("OAuthUser", OAuthUserSchema);

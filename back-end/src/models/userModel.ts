import mongoose, { Document, Schema } from "mongoose";
import { ROLES, RoleType } from "../constatnts.ts/role";

export interface IUser extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  role: RoleType;
  status: "active" | "suspended";
  agreedToTerms: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    agreedToTerms: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);

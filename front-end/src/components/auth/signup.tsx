"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchemaType } from "@/validation/signupScehema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import clsx from "clsx";
import { toast } from "react-hot-toast";
import PasswordInput from "./password";
import RoleSelector from "./roleSelector";
import { useUserStore } from "@/store/zustand";
import api from "@/lib/axios";

type Props = {
  onSwitch: () => void;
};

export default function SignUpCard({ onSwitch }: Props) {
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const selectedRole = watch("role");

  const onSubmit = async (formData: SignupSchemaType) => {
    try {
      const res = await api.post("/auth/signup", formData);
      const data = res.data;

      setUser({
        fullName: data.user.fullName,
        email: data.user.email,
        role: data.user.role,
      });

      toast.success("Account Created!");
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || err.message || "Signup failed";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full overflow-y-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Create Your Account</h3>
      <p className="text-gray-600">Select your role to begin</p>

      <RoleSelector
        selectedRole={selectedRole}
        setSelectedRole={(role) => setValue("role", role)}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} placeholder="Your name" />
          {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} placeholder="you@example.com" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Create a password"
          {...register("password")}
        />
        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}

        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={watch("agreedToTerms")}
            onCheckedChange={(checked) => setValue("agreedToTerms", !!checked)}
          />
          <Label htmlFor="terms" className="text-blue-700 text-sm">
            I agree to RentWise's Terms and{" "}
            <Link href="/policy" className="underline">
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.agreedToTerms && (
          <p className="text-sm text-red-600">{errors.agreedToTerms.message}</p>
        )}

        <Button
          type="submit"
          className={clsx(
            "w-full py-6 text-lg font-bold",
            selectedRole === "owner" && "bg-yellow-100 text-gray-900 hover:bg-yellow-600",
            selectedRole === "tenant" && "bg-blue-400 hover:bg-blue-950"
          )}
          disabled={!selectedRole}
        >
          Create Account
        </Button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <button onClick={onSwitch} className="text-blue-700 underline">
          Sign in
        </button>
      </p>
    </div>
  );
}

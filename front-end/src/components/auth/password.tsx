"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  required?: boolean;
};

export default function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  required = false,
}: Props) {
  // 👁️ Local state for toggling password visibility
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 pr-10"
      />
      {/* 🔥 Eye icon button */}
      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute top-8 right-3 text-gray-600 hover:text-gray-900"
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}

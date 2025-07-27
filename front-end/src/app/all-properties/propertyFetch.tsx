// hooks/useProperties.ts
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "react-hot-toast";
import { log } from "node:console";

export type Property = {
  _id: string;
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
  availableFrom: string;
  amenities: string[];
  leaseTerms: number;
};

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get("/property/allproperty");
        setProperties(res.data.data);
        console.log("properties fetched :" , properties)
      } catch (err) {
        toast.error("Failed to load properties");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  return { properties, loading };
}

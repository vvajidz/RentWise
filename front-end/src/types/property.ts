export interface Property {
  id: string;
  title: string;
  propertName:string;
  location: string;
  price: number;
  imageUrl?: string;
  tenants: number;
  status: 'occupied' | 'vacant' | 'maintenance';
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  description?: string;
}
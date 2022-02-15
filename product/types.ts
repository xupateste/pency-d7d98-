export interface Product {
  id: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  description?: string;
  category?: string;
  image?: string | undefined;
  price: number;
  originalPrice?: number;
  type: "available" | "unavailable" | "variant" | "hidden" | "promotional" | "ask";
  options?: Variant[];
  featured?: boolean;
}

export interface Variant {
  id: string;
  title: string;
  count: number;
  required: boolean;
  options: Option[];
  value?: Option[];
}

export interface Option {
  id: string;
  title: string;
  price: number;
}

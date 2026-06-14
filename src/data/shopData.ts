export type ProductCategory = "T-shirt" | "Accesories" | "Bundle";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  isPromo?: boolean;
  options?: {
    label: string;
    price?: number;
    image?: string;
  }[];
}

export const shopItems: Product[] = [
  {
    id: "patch",
    name: "SciHi Patch",
    price: 100,
    category: "Accesories",
    image: "/sslg-items/Patch.jpg"
  },
  {
    id: "lanyard",
    name: "SciHi Lanyard",
    price: 145,
    category: "Accesories",
    image: "/sslg-items/Lanyard.jpg"
  },
  {
    id: "stranger",
    name: "Stranger Things Shirt",
    price: 300,
    category: "T-shirt",
    image: "/sslg-items/Band.jpg"
  },
  {
    id: "daylife",
    name: "Day in a Life Shirt",
    price: 290,
    category: "T-shirt",
    image: "/sslg-items/Daylife.jpg"
  },
  {
    id: "y2k",
    name: "Y2K Shirt",
    price: 300,
    category: "T-shirt",
    image: "/sslg-items/Y2K.jpg"
  },
  {
    id: "promo_mix",
    name: "Mix & Match Promo",
    price: 555,
    category: "Bundle",
    image: "/sslg-items/Mix.jpg",
    isPromo: true,
    options: [
      { label: "2 Shirts of your choice" }
    ]
  },
  {
    id: "promo_bundle",
    name: "Y2K x Lanyard Bundle",
    price: 410,
    category: "Bundle",
    image: "/sslg-items/Y2KxSci.jpg",
    isPromo: true
  }
];

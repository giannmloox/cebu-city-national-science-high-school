export type ProductCategory = "shirts" | "accessories";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  isPromo?: boolean;
  description?: string;
}

export const shopItems: Product[] = [
  {
    id: 1,
    name: "SciHi Lanyard",
    price: 145,
    category: "accessories",
    image: "/sslg-items/Lanyard.jpg"
  },
  {
    id: 2,
    name: "Stranger Things Shirt",
    price: 300,
    category: "shirts",
    image: "/sslg-items/ST-shirt.jpg"
  },
  {
    id: 3,
    name: "Day in a Life Shirt",
    price: 290,
    category: "shirts",
    image: "/sslg-items/Life.jpg"
  },
  {
    id: 4,
    name: "SciHi Band Shirt",
    price: 290,
    category: "shirts",
    image: "/sslg-items/Band.jpg"
  },
  {
    id: 5,
    name: "Beige 1970 Shirt",
    price: 300,
    category: "shirts",
    image: "/sslg-items/Beige.jpg"
  },
  {
    id: 6,
    name: "Good Morning SciHi Shirt",
    price: 300,
    category: "shirts",
    image: "/sslg-items/Goodmorning.jpg"
  },
  {
    id: 7,
    name: "Y2K Shirt",
    price: 300,
    category: "shirts",
    image: "/sslg-items/Y2K.jpg"
  },
  {
    id: 8,
    name: "Brigada Sale Shirt",
    price: 300,
    category: "shirts",
    image: "/sslg-items/Brigada Sale.jpg"
  },
  {
    id: 103,
    name: "SciHi Patch",
    price: 100,
    category: "accessories",
    image: "/sslg-items/Patch.jpg"
  },
  {
    id: 101,
    name: "Mix & Match Promo",
    price: 555,
    category: "shirts",
    image: "/sslg-items/Mix.jpg",
    isPromo: true,
    description: "Get any TWO shirt designs for ₱555"
  },
  {
    id: 102,
    name: "Y2K x Lanyard Bundle",
    price: 410,
    category: "accessories",
    image: "/sslg-items/Y2KxSci.jpg",
    isPromo: true,
    description: "Get the Y2K shirt + SciHi Lanyard bundle for ₱410."
  }
];

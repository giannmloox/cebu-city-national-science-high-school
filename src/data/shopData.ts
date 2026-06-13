export type ShopItem = {
  id: string | number;
  name: string;
  price: number;
  image: string;
  category: "accessories" | "shirts" | "promo";
  description?: string;
};

export const shopItems: ShopItem[] = [
  {
    id: 1,
    name: "SciHi Lanyard",
    price: 145,
    image: "/sslg-items/Lanyard.jpg",
    category: "accessories",
    description: "Official school lanyard."
  },
  {
    id: 2,
    name: "Stranger Things Shirt",
    price: 300,
    image: "/sslg-items/ST-shirt.jpg",
    category: "shirts",
    description: "Stranger Things inspired school shirt."
  },
  {
    id: 3,
    name: "Day in a Life Shirt",
    price: 290,
    image: "/sslg-items/Life.jpg",
    category: "shirts",
    description: "Inspired by a day in the life at SciHi."
  },
  {
    id: 4,
    name: "SciHi Band Shirt",
    price: 290,
    image: "/sslg-items/Band.jpg",
    category: "shirts",
    description: "Official SciHi band shirt."
  },
  {
    id: 5,
    name: "Beige 1970 Shirt",
    price: 300,
    image: "/sslg-items/Beige.jpg",
    category: "shirts",
    description: "Classic beige 1970 style shirt."
  },
  {
    id: 6,
    name: "Good Morning SciHi Shirt",
    price: 300,
    image: "/sslg-items/Goodmorning.jpg",
    category: "shirts",
    description: "Good morning SciHi graphic shirt."
  },
  {
    id: 7,
    name: "Y2K Shirt",
    price: 300,
    image: "/sslg-items/Y2K.jpg",
    category: "shirts",
    description: "Trendy Y2K style shirt."
  },
  {
    id: 8,
    name: "Brigada Sale Shirt",
    price: 300,
    image: "/sslg-items/Brigada%20Sale.jpg",
    category: "shirts",
    description: "Official Brigada Sale event shirt."
  },
  {
    id: "promo-1",
    name: "Mix & Match Promo",
    price: 555,
    category: "promo",
    image: "/sslg-items/Mix.jpg",
    description: "Get any 2 shirt designs for ₱555. After ordering, type your selected items in the order notes or message us directly."
  },
  {
    id: "promo-2",
    name: "Y2K + SciHi Lanyard Bundle",
    price: 410,
    category: "promo",
    image: "/sslg-items/Y2KxSci.jpg",
    description: "Get the Y2K shirt + SciHi Lanyard bundle for ₱410. After ordering, confirm your selection in the order notes or message us."
  }
];

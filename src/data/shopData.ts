export type ShopItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: "accessories" | "shirts";
  description?: string;
};

export const shopItems: ShopItem[] = [
  {
    id: 1,
    name: "SciHi Band Shirt",
    price: 290,
    image: "/sslg-items/Band.jpg",
    category: "shirts",
    description: "Official SciHi band shirt."
  },
  {
    id: 2,
    name: "Beige 1970 Shirt",
    price: 300,
    image: "/sslg-items/Beige.jpg",
    category: "shirts",
    description: "Classic beige 1970 style shirt."
  },
  {
    id: 3,
    name: "Brigada Sale Shirt",
    price: 300,
    image: "/sslg-items/Brigada%20Sale.jpg",
    category: "shirts",
    description: "Official Brigada Sale event shirt."
  },
  {
    id: 4,
    name: "Good Morning SciHi Shirt",
    price: 300,
    image: "/sslg-items/Goodmorning.jpg",
    category: "shirts",
    description: "Good morning SciHi graphic shirt."
  },
  {
    id: 5,
    name: "SciHi Lanyard",
    price: 145,
    image: "/sslg-items/Lanyard.jpg",
    category: "accessories",
    description: "Official school lanyard."
  },
  {
    id: 6,
    name: "Day in a Life Shirt",
    price: 290,
    image: "/sslg-items/Life.jpg",
    category: "shirts",
    description: "Inspired by a day in the life at SciHi."
  },
  {
    id: 7,
    name: "ST Shirt",
    price: 300,
    image: "/sslg-items/ST-shirt.jpg",
    category: "shirts",
    description: "Classic ST school shirt."
  },
  {
    id: 8,
    name: "Y2K Shirt",
    price: 300,
    image: "/sslg-items/Y2K.jpg",
    category: "shirts",
    description: "Trendy Y2K style shirt."
  }
];

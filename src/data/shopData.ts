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
    name: "SciHi Patch",
    price: 100,
    image: "/sslg-items/patch.jpg",
    category: "accessories",
    description: "Official SciHi embroidered patch."
  },
  {
    id: 2,
    name: "SciHi Lanyard",
    price: 145,
    image: "/sslg-items/lanyard.jpg",
    category: "accessories",
    description: "Official school lanyard."
  },
  {
    id: 3,
    name: "Stranger Things Shirt (Black or White)",
    price: 300,
    image: "/sslg-items/stranger-things.jpg",
    category: "shirts"
  },
  {
    id: 4,
    name: "Day in a Life Shirt",
    price: 290,
    image: "/sslg-items/day-in-life.jpg",
    category: "shirts"
  },
  {
    id: 5,
    name: "SciHi Band Shirt",
    price: 290,
    image: "/sslg-items/band-shirt.jpg",
    category: "shirts"
  },
  {
    id: 6,
    name: "Beige 1970 Shirt",
    price: 300,
    image: "/sslg-items/beige-1970.jpg",
    category: "shirts"
  },
  {
    id: 7,
    name: "Good Morning SciHi Shirt",
    price: 300,
    image: "/sslg-items/good-morning.jpg",
    category: "shirts"
  },
  {
    id: 8,
    name: "Y2K Shirt",
    price: 300,
    image: "/sslg-items/y2k.jpg",
    category: "shirts"
  }
];

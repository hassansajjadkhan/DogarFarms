
export interface Mango {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  weight: string;
  origin: string;
  season: string;
  taste: string;
}

export interface User {
  email: string;
  name: string;
  password: string;
  mobile: string;
  address: string;
  postalCode: string;
  city: string;
}

const mangoes: Mango[] = [
  
    {
      "id": "sindhri",
      "name": "Sindhri Mango",
      "price": 4800,
      "description": "Known as the 'Queen of Mangoes,' Sindhri mangoes are large, sweet, and have a distinct aroma. These mangoes are perfect for making desserts, milkshakes, and enjoying fresh.",
      "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1974&q=80",
      "weight": "8 kg",
      "origin": "Sindh, Pakistan",
      "season": "May - July",
      "taste": "Sweet with slightly tangy notes"
    },
    {
      "id": "dusehri",
      "name": "Dusehri Mango",
      "price": 4700,
      "description": "Dusehri mangoes are medium-sized with a rich, sweet flavor and minimal fiber. They are ideal for fresh consumption and are a favorite among mango enthusiasts.",
      "image": "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?auto=format&fit=crop&w=1974&q=80",

      "weight": "8 kg",
      "origin": "Punjab, Pakistan",
      "season": "June - July",
      "taste": "Sweet and aromatic"
    },
    {
      "id": "anwar-ratol",
      "name": "Anwar Ratol Mango",
      "price": 4800,
      "description": "Anwar Ratol is a small to medium-sized mango with an incredibly sweet taste and distinctive aroma. This premium variety is highly sought after for its exceptional flavor profile.",
      "image": "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?auto=format&fit=crop&w=1974&q=80",

      "weight": "8 kg",
      "origin": "Rahim Yar Khan, Pakistan",
      "season": "June - July",
      "taste": "Rich, sweet with complex flavor notes"
    },
    {
      "id": "chaunsa",
      "name": "Chaunsa Mango",
      "price": 4850,
      "description": "Chaunsa is one of Pakistan's premium mango varieties, known for its sweet, aromatic, and fiber-less flesh. The pulp has a pleasant fragrance and exceptionally sweet taste.",
      "image": "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=1974&q=80",
      "weight": "8 kg",
      "origin": "Punjab, Pakistan",
      "season": "June - August",
      "taste": "Intensely sweet with honey-like flavor"
    },
    {
      "id": "langra",
      "name": "Langra Mango",
      "price": 4700,
      "description": "Langra mangoes have a distinct flavor profile with a perfect balance of sweet and tangy notes. The flesh is fiber-free and has a pleasant aroma that makes it highly desirable.",
      "image": "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?auto=format&fit=crop&w=1974&q=80",
      "weight": "8 kg",
      "origin": "Multan, Pakistan",
      "season": "July - August",
      "taste": "Sweet with subtle tanginess"
    },
    {
      "id": "white-chaunsa",
      "name": "White Chaunsa Mango",
      "price": 4900,
      "description": "White Chaunsa is a late-season variety of Chaunsa mango, known for its high sweetness and citrusy tinge. Its white-colored flesh remains whitish even when ripe, and it has a thick skin that prevents shriveling.",
      "image": "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=1974&q=80",
      "weight": "8 kg",
      "origin": "Punjab, Pakistan",
      "season": "September - October",
      "taste": "Very sweet with citrusy notes"
    },
    {
      "id": "kala-chaunsa",
      "name": "Kala Chaunsa Mango",
      "price": 4950,
      "description": "Kala Chaunsa, often referred to as the 'King of Mangoes' in Pakistan, combines exceptional sweetness with rich cultural heritage. It has a darker skin color and is known for its juicy, fiberless flesh.",
      "image": "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=1974&q=80",
      "weight": "8 kg",
      "origin": "Rahim Yar Khan, Pakistan",
      "season": "August - September",
      "taste": "Complex sweetness with mild sourness"
    }
    
];

// Functions to interact with the mock database
export const getAllMangoes = (): Mango[] => {
  return mangoes;
};

export const getMangoById = (id: string): Mango | undefined => {
  return mangoes.find(mango => mango.id === id);
};

// User functions
export const registerUser = (userData: User): boolean => {
  try {
    // In a real app, you would hash the password before storing
    localStorage.setItem('mangoUser', JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

export const loginUser = (email: string, password: string): User | null => {
  try {
    const userData = localStorage.getItem('mangoUser');
    if (!userData) return null;
    
    const user = JSON.parse(userData) as User;
    if (user.email === email && user.password === password) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const getCurrentUser = (): User | null => {
  try {
    const userData = localStorage.getItem('mangoUser');
    if (!userData) return null;
    return JSON.parse(userData) as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

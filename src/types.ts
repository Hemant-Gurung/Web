export interface MenuItem {
  name: string;
  price: number;
  description: string;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

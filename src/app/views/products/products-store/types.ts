export interface IProductCategory {
  id: number;
  up: number | null;
  emoji: string | null;
  name: number | null;
  description: string | null;
  thumb: string | null;
  ord: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface IProduct {
  id: number;
  categoryId: number;
  name: string | null;
  price: number | null;
  discount: number | null;
  imgs: string | null;
  summary: string | null;
  description: string | null;
  created_at: string | null;
  updated_at: string | null;
}

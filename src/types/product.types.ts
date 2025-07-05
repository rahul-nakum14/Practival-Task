import { ICategory } from "./category.types";

export interface IProductInput {
  name: string;
  description: string;
  quantity: number;
  categoryIds: number[];
}

export interface IProductFilter {
  search?: string;
  categoryIds?: number[];
  page?: number;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  quantity: number;
  createdAt: string;
  categories: ICategory[];
}

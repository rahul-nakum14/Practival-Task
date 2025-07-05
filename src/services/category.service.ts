import { prisma } from '../config/db.config';
import { CustomError } from '../utils/customError';

export const listCategories = async () => {
  const categories = await prisma.category.findMany();
  if (!categories.length) throw new CustomError('No categories found', 404);
  return categories;
};

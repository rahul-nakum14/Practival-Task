import { prisma } from '../config/db.config';
import { CustomError } from '../utils/customError';
import { IProductInput } from '../types/product.types';

export const createProduct = async (input: IProductInput) => {
  const exists = await prisma.product.findUnique({ where: { name: input.name } });
  if (exists) throw new CustomError('Product name already exists', 400);

  const foundCats = await prisma.category.count({ where: { id: { in: input.categoryIds } } });
  if (foundCats !== input.categoryIds.length) {
    throw new CustomError('categories not found', 400);
  }

  return prisma.product.create({
    data: {
      name: input.name,
      description: input.description,
      quantity: input.quantity,
      categories: {
        connect: input.categoryIds.map(id => ({ id })),
      },
    },
    include: { categories: true },
  });
};


export const listProducts = async (
  page: number = 1,
  search?: string,
  categoryIds?: number[]
) => {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const where: any = {
    name: {
      contains: search ?? '',
      mode: 'insensitive',
    },
  };

  if (categoryIds?.length) {
    where.categories = {
      some: {
        id: {
          in: categoryIds,
        },
      },
    };
  }

  const [products, totalItems] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { categories: true },
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    pagination: {
      currentPage: page,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      pageSize,
    },
  };
};


export const deleteProduct = async (id: number) => {
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    throw new Error(`Product with ID ${id} does not exist.`);
  }

  await prisma.product.delete({ where: { id } });
  return true;
};


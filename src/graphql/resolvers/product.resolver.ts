import { createProduct, deleteProduct, listProducts } from '../../services/product.services';
import { IProductFilter, IProductInput } from '../../types/product.types';
import { validate, productSchema } from '../../utils/joiValidator';
import logger from '../../utils/logger';

export const productResolvers = {
  Query: {
    products: async (_: any, filter: IProductFilter) => {
      const { page, search, categoryIds } = filter;

      logger.info('Fetching products', { page, search, categoryIds });

      return listProducts(page, search, categoryIds);
    },
  },
  Mutation: {
    createProduct: async (_: any, { input }: { input: IProductInput }) => {
      try {
        validate(productSchema, input);
        const product = await createProduct(input);
        logger.info('Product created', { name: input.name });
        return product;
      } catch (err: any) {
        logger.error('Create product error:', err.message);
        throw err;
      }
    },
  deleteProduct: async (_: any, { id }: { id: number }) => {
    return await deleteProduct(id);
},
  },
};


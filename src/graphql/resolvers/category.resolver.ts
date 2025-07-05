import { listCategories } from '../../services/category.service';
import logger from '../../utils/logger';

export const categoryResolvers = {
  Query: {
    categories: async () => {
      logger.info('Fetching categories');
      return listCategories();
    },
  },
};

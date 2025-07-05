import { categoryResolvers } from './category.resolver';
import { productResolvers } from './product.resolver';

export const resolvers = {
  Query: {
    ...productResolvers.Query,
    ...categoryResolvers.Query,
  },
  Mutation: {
    ...productResolvers.Mutation,
  },
};

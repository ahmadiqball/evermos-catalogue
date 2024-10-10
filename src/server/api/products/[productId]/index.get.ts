import { defineEventHandler, getRouterParam } from 'h3';
import { createError } from '#imports';
import db from '~/server/data/db.json';

export default defineEventHandler((event) => {
  const productId = getRouterParam(event, 'productId');
  const product = db.product.find((product) => product.id === productId);

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
    });
  }

  return {
    product,
  };
});

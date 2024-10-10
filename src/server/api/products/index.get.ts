import { defineEventHandler, getQuery } from 'h3';
import { createError } from '#imports';
import db from '~/server/data/db.json';

interface QUeryParams {
  search?: string;
  limit?: number;
  page?: number;
}

export default defineEventHandler((event) => {
  const productsRaw = db.product;
  const { limit, page, search } = getQuery<QUeryParams>(event);

  let products = [...productsRaw];

  if (search) {
    products = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  const totalProductsFound = products.length;
  const totalPage = Math.ceil(products.length / (limit || 1));

  if (limit || page) {
    if (!page) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing params',
        message: 'The query should be accompanied by the page parameter.',
      });
    }

    if (!limit) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing params',
        message: 'Pagination should be accompanied by the limit parameter.',
      });
    }

    products = products.slice(limit * (page - 1), limit * page);
  }

  return {
    products,
    totalPage,
    productInPage: products.length,
    totalProductsFound,
    totalProducts: productsRaw.length,
  };
});

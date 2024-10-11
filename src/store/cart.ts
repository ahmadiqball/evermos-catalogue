import { defineStore } from 'pinia';
import type { Product } from '~/typings/index.entity';

interface CartProductItem {
  data: Product;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    products: [] as Array<CartProductItem>,
    wishlist: new Map<string, Product>(),
  }),
  actions: {
    add(product: Product) {
      const existing = this.getCartItemByID(product.id);

      if (existing) {
        existing.quantity++;
      } else {
        this.products.push({
          data: product,
          quantity: 1,
        });
      }
    },
    increase(id: string) {
      const existing = this.getCartItemByID(id);

      if (existing) {
        existing.quantity++;
      }
    },
    decrease(id: string) {
      const existing = this.getCartItemByID(id);

      if (existing) {
        if (existing.quantity < 2) {
          this.remove(id);
        } else {
          existing.quantity--;
        }
      }
    },
    remove(id: string) {
      this.products = this.products.filter((product) => product.data.id !== id);
    },
    like(product: Product) {
      this.wishlist.set(product.id, product);
    },
    unlike(id: string) {
      this.wishlist.delete(id);
    },
  },
  getters: {
    getCartItemByID(state) {
      return (id: string) => state.products.find((item) => item.data.id === id);
    },
  },
});

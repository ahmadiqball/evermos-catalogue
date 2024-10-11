<script setup lang="ts">
import { useCartStore } from '~/store/cart';
import type { Product } from '~/typings/index.entity';

interface CoreCartMutation {
  product: {
    data: Product;
    quantity: number;
  };
}

defineProps<CoreCartMutation>();

const cartStore = useCartStore();
</script>

<template>
  <div class="mutation">
    <button
      class="mutation-button"
      @click="cartStore.decrease(product.data.id)"
    >
      <IconMinus />
    </button>
    <div class="mutation-quantity">{{ product.quantity }}</div>
    <button
      class="mutation-button"
      @click="cartStore.increase(product.data.id)"
    >
      <IconPlus />
    </button>
  </div>
</template>

<style scoped>
.mutation {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 auto;
  font-size: 18px;
  padding: 10px 18px;
  border-radius: 999px;
  border: solid var(--color-green-400) 2px;
}

.mutation-quantity {
  font-size: 20px;
  font-weight: 700;
}

.mutation-button {
  font-size: 24px;
  cursor: pointer;

  svg {
    color: black;
    height: 14px;
  }
}
</style>

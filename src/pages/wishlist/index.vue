<script setup lang="ts">
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();
</script>

<template>
  <section class="product-list">
    <CoreProductCard
      v-for="product in Array.from(cartStore.wishlist)"
      :key="product[0]"
      :product="product[1]"
    />
  </section>
</template>

<style scoped>
.product-list {
  display: grid;
  margin: 16px;
  margin-top: 110px;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
</style>

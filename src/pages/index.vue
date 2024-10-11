<script setup lang="ts">
import { useFetch } from '#app';

const { data } = await useFetch('/api/products?limit=12&page=1');
</script>

<template>
  <section class="product-list">
    <CoreProductCard
      v-for="product in data?.products"
      :key="product.id"
      :product="product"
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

@media (max-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .product-list {
    gap: 8px;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

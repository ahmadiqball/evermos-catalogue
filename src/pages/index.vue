<script setup lang="ts">
import { useFetch } from '#app';
import { ref } from 'vue';

const searchInput = ref('');
const { data } = await useFetch(`/api/products`, {
  query: {
    limit: 12,
    page: 1,
    search: searchInput,
  },
});
</script>

<template>
  <section class="product-page container">
    <div>
      <input
        v-model="searchInput"
        class="product-search"
        placeholder="Search products..."
      />
    </div>

    <div class="product-list">
      <CoreProductCard
        v-for="product in data?.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<style scoped>
.product-page {
  margin-top: 110px;
}

.product-search {
  outline: none;
  border: #d4d4d4 solid 2px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
  transition: ease-in 280ms;
}

.product-search:focus {
  border: var(--color-blue-500) solid 2px;
}

.product-list {
  display: grid;
  margin-top: 40px;
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

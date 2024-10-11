<script setup lang="ts">
import { useFetch } from '#app';
import { useHeadSafe } from '#imports';
import { ref } from 'vue';

const searchInput = ref('');
const displayedPage = ref(1);
const { data } = await useFetch(`/api/products`, {
  query: {
    limit: 12,
    page: displayedPage,
    search: searchInput,
  },
});

useHeadSafe({
  title: 'Products',
});
</script>

<template>
  <section class="product-page container">
    <div class="product-search-wrapper">
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

    <div class="product-pagination-wrapper">
      <button
        v-for="page in data?.totalPage"
        :key="page"
        class="product-pagination"
        :class="{ 'product-pagination-active': displayedPage === page }"
        @click="displayedPage = page"
      >
        {{ page }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.product-page {
  margin-top: 110px;
}

.product-search-wrapper {
  display: flex;
  justify-content: flex-end;
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
  margin: 40px 0;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.product-pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  row-gap: 8px;
  margin: 40px 0;
}

.product-pagination {
  cursor: pointer;
  padding: 4px;
  transition: ease-in 200ms;
  font-size: 14px;
}

.product-pagination-active {
  background-color: var(--color-green-400);
  color: white;
}

.product-pagination:hover {
  background-color: var(--color-green-400);
  color: white;
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

  .product-pagination {
    font-size: 12px;
  }
}
</style>

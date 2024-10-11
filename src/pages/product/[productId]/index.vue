<script setup lang="ts">
import { useFetch } from '#app';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '~/typings/index.entity';
import { formatDate } from '~/utils/format-date';
import { formatPrice } from '~/utils/format-price';

interface ProductResult {
  product: Product;
}

const productId = useRoute().params.productId;

const { data } = await useFetch<ProductResult>('/api/products/' + productId);
const tabIndex = ref(1);
</script>

<template>
  <section v-if="data" class="product-container">
    <img :src="data.product.images[0]" class="product-image" />
    <div>
      <CoreCategoryBadge :category="data.product.category" />
      <h2>{{ data?.product.title }}</h2>
      <h3>{{ formatPrice(data.product.price) }}</h3>
      <p>{{ data.product.rating }}</p>
      <p>{{ `Stock: ${data.product.stock} items left` }}</p>

      <div class="product-tab">
        <button class="product-tab-button" @click="tabIndex = 1">
          description
        </button>
        <button class="product-tab-button" @click="tabIndex = 2">
          reviews
        </button>
        <span class="product-tab-indicator" />
      </div>

      <div v-if="tabIndex === 1">
        {{ data.product.description }}
      </div>

      <div v-if="tabIndex === 2">
        <div
          v-for="review in data.product.reviews"
          :key="`${review.date}-${review.reviewerName}`"
        >
          <p>{{ review.reviewerName }}</p>
          <p>{{ formatDate(review.date) }}</p>
          <p>{{ review.reviewerEmail }}</p>
          <p>{{ review.rating }}</p>
          <p>{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 80px;
}

.product-image {
  width: 100%;
}

.product-tab {
  position: relative;
  display: flex;
  gap: 16px;
  margin-bottom: 4px;
}

.product-tab-button {
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 700;
  padding: 8px 4px;
  cursor: pointer;
  width: 120px;
  transition: linear background 140ms;
}

.product-tab-button:hover {
  background-color: var(--color-blue-100);
  color: white;
}

.product-tab-indicator {
  height: 4px;
  width: 120px;
  background-color: var(--color-blue-400);
  position: absolute;
  bottom: -4px;
  transform: translateX(calc(calc(100% + 16px) * calc(v-bind(tabIndex) - 1)));
  transition: linear transform 140ms;
}
</style>

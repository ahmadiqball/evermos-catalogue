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
  <section v-if="data" class="product-container container">
    <img :src="data.product.images[0]" class="product-image" />
    <div>
      <div class="flex-between">
        <CoreCategoryBadge :category="data.product.category" />
        <div class="product-rating">
          <IconStarFilled />
          <p>{{ data.product.rating.toFixed(1) }}</p>
        </div>
      </div>

      <h2 class="product-title">{{ data?.product.title }}</h2>
      <h3 class="product-price">{{ formatPrice(data.product.price) }}</h3>
      <p class="product-stock">
        {{ `Stock: ${data.product.stock} items left` }}
      </p>

      <div class="product-tab">
        <button class="product-tab-button" @click="tabIndex = 1">
          description
        </button>
        <button class="product-tab-button" @click="tabIndex = 2">
          reviews
        </button>
        <span class="product-tab-indicator" />
      </div>

      <div v-if="tabIndex === 1" class="product-description">
        {{ data.product.description }}
      </div>

      <div v-if="tabIndex === 2" class="product-review">
        <div
          v-for="review in data.product.reviews"
          :key="`${review.date}-${review.reviewerName}`"
          class="review-card"
        >
          <div class="review-rating-wrapper">
            <IconStarFilled />
            <p class="review-rating">{{ review.rating.toFixed(1) }}</p>
          </div>
          <div class="review-identity">
            <p class="review-name">{{ review.reviewerName }}</p>
            <p class="review-email">{{ `(${review.reviewerEmail})` }}</p>
          </div>
          <p class="review-date">{{ formatDate(review.date) }}</p>

          <p class="review-comment">{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-container {
  display: grid;
  margin-top: 110px;
  grid-template-columns: repeat(2, 1fr);
  gap: 80px;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-rating {
  display: flex;
  gap: 8px;
  align-items: center;

  svg {
    color: rgb(239, 203, 22);
    height: 20px;
  }
}

.product-image {
  width: 100%;
}

.product-title {
  font-size: 42px;
  font-weight: 700;
  margin-top: 14px;
}

.product-price {
  margin-top: 16px;
  font-size: 24px;
}

.product-stock {
  margin-top: 14px;
  font-size: 16px;
}

.product-tab {
  position: relative;
  display: flex;
  gap: 16px;
  margin-bottom: 4px;
  margin-top: 20px;
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

.product-description {
  margin-top: 20px;
}

.review-card {
  margin: 12px 0;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
}

.product-review {
  margin-top: 20px;
}

.review-identity {
  display: flex;
  gap: 8px;
}

.review-email {
  color: grey;
}

.review-date {
  font-size: 14px;
  color: grey;
  margin-top: 4px;
}

.review-rating-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    height: 12px;
    color: rgb(239, 203, 22);
  }
}

.review-rating {
  font-size: 14px;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: repeat(1, 1fr);
    gap: 32px;
  }

  .product-image {
    max-height: 200px;
    width: auto;
    margin: 0 auto;
  }

  .product-title {
    font-size: 24px;
  }

  .product-price {
    font-size: 18px;
  }

  .product-stock {
    font-size: 14px;
  }

  .review-card {
    font-size: 14px;
  }

  .review-identity {
    display: flex;
    gap: 4px;
    flex-flow: column;
  }
}
</style>

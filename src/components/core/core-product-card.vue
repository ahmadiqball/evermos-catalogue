<script setup lang="ts">
import type { Product } from '~/typings/index.entity';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <NuxtLink class="product-card" :to="`/product/${product.id}`">
    <img :src="product.images[0]" class="product-image" />
    <span class="product-category">
      {{ product.category }}
    </span>

    <h6 class="product-title">{{ product.title }}</h6>

    <div class="product-price-wrapper">
      <p class="product-price">
        {{ `Rp. ${new Intl.NumberFormat('id-ID').format(product.price)}` }}
      </p>

      <span class="product-discount">{{
        `- ${Math.ceil(product.discountPercentage)}%`
      }}</span>
    </div>

    <p class="product-description">{{ product.description }}</p>
  </NuxtLink>
</template>

<style scoped>
.product-card {
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 5;
  row-gap: 8px;
}

.product-image {
  max-width: 100%;
  height: 150px;
  margin: 0 auto;
  display: block;
}

.product-category {
  text-transform: capitalize;
  font-size: 12px;
  border-radius: 4px;
  background-color: var(--color-blue-400);
  padding: 4px 6px;
  color: white;
  width: fit-content;
}

.product-title {
  font-weight: 600;
  font-size: 20px;
}

.product-price-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-price {
  font-weight: 600;
  font-size: 14px;
}

.product-discount {
  font-size: 12px;
  color: white;
  background-color: var(--color-green-500);
  padding: 2px 4px;
  border-radius: 2px;
}

.product-description {
  font-size: 12px;
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

@media (max-width: 640px) {
  .product-card {
    padding: 10px;
  }

  .product-image {
    height: 100px;
  }

  .product-category {
    font-size: 10px;
  }

  .product-title {
    font-size: 14px;
  }

  .product-price {
    font-size: 12px;
  }

  .product-discount {
    font-size: 10px;
  }

  .product-description {
    font-size: 10px;
  }
}
</style>

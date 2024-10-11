<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '~/store/cart';
import type { Product } from '~/typings/index.entity';
import { formatPrice } from '~/utils/format-price';

const props = defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();

const isProductInCart = computed(() =>
  Boolean(cartStore.getCartItemByID(props.product.id))
);

const isProductInWishlist = computed(() =>
  cartStore.wishlist.has(props.product.id)
);

function addToCart(event: Event) {
  event.preventDefault();

  cartStore.add(props.product);
}

function wishlistHandler(event: Event) {
  event.preventDefault();

  if (isProductInWishlist.value) {
    cartStore.unlike(props.product.id);
  } else {
    cartStore.like(props.product);
  }
}
</script>

<template>
  <NuxtLink class="product-card" :to="`/product/${product.id}`">
    <img :src="product.images[0]" class="product-image" />

    <CoreCategoryBadge :category="product.category" />

    <h6 class="product-title">{{ product.title }}</h6>

    <div class="product-price-wrapper">
      <p class="product-price">
        {{ formatPrice(product.price) }}
      </p>

      <span class="product-discount">{{
        `- ${Math.ceil(product.discountPercentage)}%`
      }}</span>
    </div>

    <p class="product-description">{{ product.description }}</p>

    <button
      class="product-button"
      :disabled="isProductInCart"
      :class="{ 'product-button-disabled': isProductInCart }"
      @click="addToCart"
    >
      {{ isProductInCart ? 'Added to cart' : 'Add to cart' }}
    </button>

    <button
      class="product-like"
      :style="{ color: `${isProductInWishlist ? '#eb4a4a' : 'grey'}` }"
      @click="wishlistHandler"
    >
      <IconHeartFilled v-if="isProductInWishlist" />
      <IconHeart v-else />
    </button>
  </NuxtLink>
</template>

<style scoped>
.product-card {
  position: relative;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 6;
  row-gap: 8px;
}

.product-like {
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;

  svg {
    height: 24px;
  }
}

.product-image {
  max-width: 100%;
  height: 150px;
  margin: 0 auto;
  display: block;
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

.product-button {
  margin-top: 8px;
  background-color: var(--color-blue-300);
  padding: 8px 4px;
  font-weight: 500;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  z-index: 10;
  transition: ease-in background 280ms;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 6px 12px rgba(0, 0, 0, 0.15),
    0 12px 24px rgba(0, 0, 0, 0.1);
}

.product-button-disabled {
  background-color: grey;
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

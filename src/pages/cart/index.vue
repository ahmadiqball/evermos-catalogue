<script setup lang="ts">
import { computed, formatPrice, useHeadSafe } from '#imports';
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();

const totalCartPrice = computed(() =>
  cartStore.products.reduce(
    (acc, val) => (acc += val.quantity * val.data.price),
    0
  )
);

useHeadSafe({
  title: 'Cart',
});
</script>

<template>
  <section class="cart">
    <div class="cart-wrapper">
      <div class="product-wrapper custom-scrollbar">
        <div
          v-for="product in cartStore.products"
          :key="product.data.id"
          class="cart-product"
        >
          <NuxtLink :to="`/product/${product.data.id}`">
            <img :src="product.data.images[0]" class="product-image" />
          </NuxtLink>

          <NuxtLink
            :to="`/product/${product.data.id}`"
            class="product-title-wrapper"
          >
            <CoreCategoryBadge :category="product.data.category" />
            <h6 class="product-title">{{ product.data.title }}</h6>
          </NuxtLink>

          <CoreCartMutation :product="product" />

          <p class="product-price">
            {{ formatPrice(product.quantity * product.data.price) }}
          </p>

          <button
            class="product-delete"
            @click="cartStore.remove(product.data.id)"
          >
            <IconTrashCan />
          </button>
        </div>
      </div>

      <div class="cart-footer">
        <h5 class="cart-total">
          {{ `Total : ${formatPrice(totalCartPrice)}` }}
        </h5>
        <button class="cart-order">Order</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cart {
  height: calc(100vh - 120px);
}

.cart-wrapper {
  margin: 20px 10px;
  margin-top: 100px;
  padding: 20px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  height: 100%;
  max-height: 100%;
}

.product-wrapper {
  height: calc(100% - 64px);
  max-height: calc(100% - 64px);
  overflow-y: scroll;
  padding-right: 10px;
}

.cart-product {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  gap: 20px;
  border-bottom: solid black 1px;
  min-height: 150px;
}

.cart-product:last-child {
  border: none;
}

.product-image {
  width: 150px;
}

.product-title-wrapper {
  grid-column: span 2;
}

.product-title {
  margin-top: 10px;
  font-size: 22px;
}

.product-quantity {
  text-align: center;
}

.product-price {
  text-align: center;
}

.product-delete {
  color: rgba(205, 42, 85, 0.6);
  cursor: pointer;
  transition: ease-in color 200ms;

  svg {
    height: 20px;
  }
}

.product-delete:hover {
  color: rgba(205, 42, 85, 1);
}

.cart-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
}

.cart-total {
  font-size: 24px;
}

.cart-order {
  border-radius: 999px;
  background-color: var(--color-blue-400);
  color: white;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { computed, formatPrice } from '#imports';
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();

const totalCartPrice = computed(() =>
  cartStore.products.reduce(
    (acc, val) => (acc += val.quantity * val.data.price),
    0
  )
);
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
          <img :src="product.data.images[0]" class="product-image" />
          <div class="product-title-wrapper">
            <CoreCategoryBadge :category="product.data.category" />
            <h6 class="product-title">{{ product.data.title }}</h6>
          </div>

          <p class="product-quantity">{{ product.quantity }}</p>

          <p class="product-price">
            {{ formatPrice(product.quantity * product.data.price) }}
          </p>

          <button>delete</button>
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

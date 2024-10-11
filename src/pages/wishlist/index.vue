<script setup lang="ts">
import { useHeadSafe } from '#imports';
import { useCartStore } from '~/store/cart';

const cartStore = useCartStore();

useHeadSafe({
  title: 'Wishlist',
});
</script>

<template>
  <section>
    <div class="product-list">
      <CoreProductCard
        v-for="product in Array.from(cartStore.wishlist)"
        :key="product[0]"
        :product="product[1]"
      />
    </div>
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

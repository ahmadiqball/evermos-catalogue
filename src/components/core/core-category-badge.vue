<script setup lang="ts">
const CATEGORY_COLORS = {
  'beauty': '#d48aae',
  'fragrances': '#b38cd9',
  'furniture': '#bfa580',
  'groceries': '#90be6d',
  'home-decoration': '#e57373',
  'kitchen-accessories': '#ffa726',
  'laptops': '#64b5f6',
  'mens-shirts': '#4fc3f7',
  'mens-shoes': '#1e88e5',
  'mens-watches': '#1976d2',
  'mobile-accessories': '#42a5f5',
  'motorcycle': '#0288d1',
  'skin-care': '#81c784',
  'smartphones': '#26a69a',
  'sports-accessories': '#4db6ac',
  'sunglasses': '#00796b',
  'tablets': '#8d6e63',
  'tops': '#ba68c8',
  'vehicle': '#5c6bc0',
  'womens-bags': '#ab47bc',
  'womens-dresses': '#ec407a',
  'womens-jewellery': '#f06292',
  'womens-shoes': '#f48fb1',
  'womens-watches': '#e91e63',
};

interface CoreCategoryBadge {
  category: string;
}

defineProps<CoreCategoryBadge>();
</script>

<template>
  <span class="category-badge"> {{ category.replaceAll('-', ' ') }} </span>
</template>

<style scoped>
.category-badge {
  text-transform: capitalize;
  font-size: 12px;
  border-radius: 4px;
  background-color: v-bind(CATEGORY_COLORS[category]);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px v-bind(CATEGORY_COLORS[category]);
  padding: 4px 6px;
  color: white;
  width: fit-content;
}
</style>

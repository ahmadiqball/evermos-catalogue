<script setup lang="ts">
import { NuxtPage } from '#components';
import { computed, ref } from 'vue';
import { useCartStore } from '~/store/cart';

const openMenuDropdown = ref(false);

const cartStore = useCartStore();

const totalItemInCart = computed(() =>
  cartStore.products.reduce((acc, val) => (acc += val.quantity), 0)
);
</script>

<template>
  <div>
    <header class="header">
      <NuxtLink class="header-logo" to="/">
        Catalogue
        <span />
      </NuxtLink>

      <div
        class="header-menu"
        :class="openMenuDropdown ? 'header-menu-open' : 'header-menu-close'"
      >
        <NuxtLink to="/" class="header-link">Products</NuxtLink>
        <NuxtLink to="/wishlist" class="header-link">My Wishlist</NuxtLink>
        <NuxtLink to="/cart" class="header-cart">
          <IconCart class="header-cart-icon" />
          <span>Cart</span>
          <span class="header-cart-count"> {{ totalItemInCart }}</span>
        </NuxtLink>
      </div>

      <button
        class="header-button"
        :class="{ 'header-button-open': openMenuDropdown }"
        @click="openMenuDropdown = !openMenuDropdown"
      >
        <span v-for="item in 3" :key="item" />
      </button>
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
main {
  margin-top: 74px;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  background-color: var(--color-blue-400);
  width: calc(100% - 20px);
  padding: 1rem 3rem;
  border-radius: 9999px;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0 6px 24px rgba(0, 0, 0, 0.3),
    inset 0 -4px 20px rgba(74, 144, 226, 0.3);
}

.header-logo {
  color: white;
  font-size: 1.75rem;
  font-weight: 700;

  span {
    background-color: var(--color-yellow-100);
    border-radius: 50%;
    height: 8px;
    width: 8px;
    display: inline-block;
    margin-left: 2px;
  }
}

.header-menu {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  padding: 4px 6px;
  border-radius: 4px;
  transition: linear background-color 140ms;
}

.header-link:hover {
  background-color: var(--color-green-100);
}

.header-cart {
  background-color: var(--color-yellow-100);
  color: black;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border-radius: 999px;
  font-weight: 700;
  transition: linear background 200ms;
  margin-left: 20px;
}

.header-cart-icon {
  width: 24px;
}

.header-cart-count {
  font-size: 12px;
  background-color: var(--color-green-400);
  padding: 2px 10px;
  border-radius: 999px;
}

.header-cart:hover {
  background-color: var(--color-yellow-300);
}

.header-button {
  display: none;
  background-color: transparent;
  border: none;
  flex-flow: column;
  justify-content: center;
  gap: 3px;
  height: 16px;
  cursor: pointer;

  span {
    width: 20px;
    height: 2px;
    display: inline-block;
    border-radius: 10px;
    background-color: var(--color-yellow-100);
    transition: ease-in-out 280ms;
  }

  span:nth-child(2) {
    transition: none;
  }
}

.header-button-open {
  cursor: pointer;

  span:nth-child(1) {
    transform: translateY(2px) rotate(45deg);
  }

  span:nth-child(2) {
    display: none;
    transition: ease-in-out 280ms;
  }

  span:nth-child(3) {
    transform: translateY(-2px) rotate(-45deg);
  }
}

@media (max-width: 648px) {
  .header {
    padding: 1rem 1.5rem;
  }

  .header-logo {
    font-size: 16px;
  }

  .header-menu {
    max-height: 0;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--color-blue-400);
    width: 100%;
    margin-top: 10px;
    border-radius: 16px;
    flex-flow: column;
    gap: 0px;
    padding-top: 10px;
  }

  .header-link {
    width: calc(100% - 20px);
    text-align: center;
    padding: 12px 0;
    font-size: 14px;
  }

  .header-cart {
    width: calc(100% - 20px);
    margin: 10px;
    font-size: 14px;
    max-width: 250px;
  }

  .header-cart-icon {
    width: 20px;
  }

  .header-menu-open {
    max-height: 100vh;
    animation: menu-open linear 500ms;
  }

  .header-menu-close {
    max-height: 0;
    overflow: hidden;
    animation: menu-close linear 500ms;
  }

  .header-button {
    display: flex;
  }

  @keyframes menu-open {
    0% {
      max-height: 0;
      overflow: hidden;
    }

    100% {
      max-height: 100vh;
      overflow: visible;
    }
  }

  @keyframes menu-close {
    0% {
      max-height: 100vh;
      overflow: visible;
    }

    100% {
      max-height: 0;
      overflow: hidden;
    }
  }
}
</style>

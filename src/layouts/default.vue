<script setup lang="ts">
import { NuxtPage } from '#components';
import { ref } from 'vue';

const openMenuDropdown = ref(false);
</script>

<template>
  <div>
    <header class="header">
      <h3 class="header-logo">Catalogue<span /></h3>

      <div
        class="header-menu"
        :class="openMenuDropdown ? 'header-menu-open' : 'header-menu-close'"
      >
        <NuxtLink to="/">Products</NuxtLink>
        <NuxtLink to="/cart">Cart</NuxtLink>
        <NuxtLink to="/wishlist">My Wishlist</NuxtLink>
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
}

.header-logo {
  color: white;
  font-size: 1.5rem;

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

  a {
    text-decoration: none;
    color: white;
    font-size: 14px;
    padding: 4px 6px;
    border-radius: 4px;
    transition: linear background-color 100ms;
  }

  a:hover {
    background-color: var(--color-green-100);
  }
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

    a {
      width: 100%;
      text-align: center;
      padding: 12px 0;
      font-size: 12px;
    }
  }

  .header-menu-open {
    max-height: 100vh;
    animation: menu-open linear 500ms;
  }

  .header-menu-close {
    max-height: 0;
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

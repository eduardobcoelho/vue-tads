<template>
  <main id="app-main tad-default-box">
    <template v-if="route.name != 'Login'">
      <UserDropdown></UserDropdown>
    </template>
    <router-view />
  </main>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import UserDropdown from '@/components/UIComponents/UserDropdown.vue';

  const route = useRoute();
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #app-main {
    background-color: #f2f2f2;
  }
</style>

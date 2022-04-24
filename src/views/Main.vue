<template>
  <main id="app-main tad-default-box">
    <template v-if="route.name != 'Login'">
      <UserDropdown></UserDropdown>
    </template>
    <router-view></router-view>
  </main>
</template>

<script setup>
  import { useRoute } from 'vue-router';
  import UserDropdown from '@/components/UIComponents/UserDropdown.vue';

  const route = useRoute();
</script>

<style>
  #app-main {
    background-color: #f2f2f2;
  }
</style>

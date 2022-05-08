<template>
  <main id="app-main tad-default-box">
    <template v-if="route.name != 'Login' && user && route.name != 'Profile'">
      <UserDropdown></UserDropdown>
    </template>
    <router-view></router-view>
  </main>
</template>

<script setup>
  import { computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import { useMessage } from 'naive-ui';
  import UserDropdown from '@/components/UIComponents/UserDropdown.vue';

  const store = useStore();
  const route = useRoute();
  const naiveMessage = useMessage();

  const user = computed(() => store.getters.user);
  const notification = computed(() => store.getters.notification);
  watch(notification, ({ type, message }) => {
    naiveMessage[type](message);
  });
</script>

<style>
  #app-main {
    background-color: #f2f2f2;
  }
</style>

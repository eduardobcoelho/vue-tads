<template>
  <main id="app-main">
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

  const user = computed(() => store.getters.getUser);
  const notification = computed(() => store.getters.getNotification);
  watch(notification, ({ type, message }) => {
    naiveMessage[type](message);
  });
</script>

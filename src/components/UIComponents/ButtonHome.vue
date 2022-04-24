<template>
  <div class="tad-home-button">
    <n-button
      @click="router.push({ name: 'Home' })"
      strong
      secondary
      type="primary"
    >
      <template #icon>
        <n-icon>
          <Home></Home>
        </n-icon>
      </template>
      Home
    </n-button>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { Home } from '@vicons/fa';

  const router = useRouter();
</script>

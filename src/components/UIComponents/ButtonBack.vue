<template>
  <div class="tad-back-button">
    <n-button @click="router.back()" strong secondary type="primary">
      Voltar
    </n-button>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
</script>

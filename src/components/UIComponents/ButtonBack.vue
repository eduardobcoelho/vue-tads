<template>
  <div class="tad-fixed-button">
    <n-button @click="router.back()" strong secondary type="primary">
      <template #icon>
        <n-icon>
          <ArrowCircleLeft24Filled></ArrowCircleLeft24Filled>
        </n-icon>
      </template>
      Voltar
    </n-button>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ArrowCircleLeft24Filled } from '@vicons/fluent';

  const router = useRouter();
</script>

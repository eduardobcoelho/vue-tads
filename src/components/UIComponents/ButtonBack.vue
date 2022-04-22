<template>
  <div class="tad-back-button">
    <n-button @click="router.back()" strong secondary type="primary">
      Voltar
    </n-button>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'ButtonBack',
    setup() {
      return {
        router: useRouter(),
      };
    },
  });
</script>

<template>
  <div class="tad-stack tad-default-box">
    <h1>Pilha</h1>
    <p>Digite um valor abaixo e aguarde:</p>
    <n-space vertical>
      <n-input-group>
        <n-input type="text" placeholder="Digite aqui..." />
        <n-button type="primary" ghost> Adicionar </n-button>
      </n-input-group>
    </n-space>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from '@vue/runtime-core';

  export default defineComponent({
    name: 'TadStack',
    setup() {
      let newElement = ref<string>('');
      const elements = ref<string[]>([]);

      return {
        elements,
        newElement,
      };
    },
  });
</script>

<style lang="scss">
  .tad-stack {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 14px 10px;

    h1 {
      margin-bottom: 6px;
    }
    p {
      margin-bottom: 18px;
    }

    &__display {
      padding: 14px 10px;
    }
  }
</style>

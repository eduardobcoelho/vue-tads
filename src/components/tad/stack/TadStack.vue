<template>
  <ButtonBack></ButtonBack>
  <div class="tad-stack tad-default-box">
    <h1>Pilha</h1>
    <p>Digite um valor abaixo e clique em adicionar:</p>
    <TadStackInput @addElement="addElement"></TadStackInput>
    <TadStackList :elements="elements"></TadStackList>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import TadStackInput from './TadStackInput.vue';
  import TadStackList from './TadStackList.vue';

  const elements = ref<string[]>([]);
  const addElement = (element: string): void => {
    elements.value.unshift(element);
  };
</script>

<style lang="scss" scoped>
  .tad-stack {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 14px 10px;

    &__display {
      padding: 14px 10px;
    }

    h1 {
      margin-bottom: 6px;
    }

    p {
      margin-bottom: 18px;
    }
  }
</style>

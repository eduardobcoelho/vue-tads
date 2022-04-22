<template>
  <button-back></button-back>
  <div class="tad-stack tad-default-box">
    <h1>Pilha</h1>
    <p>Digite um valor abaixo e clique em adicionar:</p>
    <n-space vertical>
      <n-input-group>
        <n-input
          v-model:value="newElement"
          type="text"
          placeholder="Digite aqui..."
        />
        <n-button
          ghost
          type="primary"
          :disabled="!newElement"
          @click="addElement"
        >
          Adicionar
        </n-button>
      </n-input-group>
    </n-space>
    <tad-stack-list :elements="elements"></tad-stack-list>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import TadStackList from './TadStackList.vue';

  let newElement = ref<string>('');
  const elements = ref<string[]>([]);
  const addElement = (): void => {
    elements.value.unshift(newElement.value);
    newElement.value = '';
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

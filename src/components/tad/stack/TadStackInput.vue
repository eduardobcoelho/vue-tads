<template>
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
</template>

<script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  const emit = defineEmits(['addElement']);

  let newElement = ref<string>('');
  const addElement = (): void => {
    emit('addElement', newElement.value);
    newElement.value = '';
  };
</script>

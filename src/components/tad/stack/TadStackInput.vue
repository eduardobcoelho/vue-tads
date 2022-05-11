<template>
  <n-space vertical>
    <n-input-group>
      <n-input
        v-model:value="newElement"
        type="text"
        placeholder="Digite aqui..."
      />
      <n-button ghost type="primary" :disabled="!newElement" @click="push">
        Adicionar()
      </n-button>
    </n-input-group>
  </n-space>
  <div class="actions">
    <n-button ghost type="primary" :disabled="isEmpty" @click="pop">
      Remover()
    </n-button>
    <n-button ghost type="primary" :disabled="isEmpty" @click="top">
      Topo()
    </n-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineEmits, defineProps } from 'vue';
  const emit = defineEmits(['push', 'pop', 'top']);
  defineProps<{ isEmpty: boolean }>();

  let newElement = ref<string>('');
  function push(): void {
    emit('push', newElement.value);
    newElement.value = '';
  }
  function pop(): void {
    emit('pop');
  }
  function top(): void {
    emit('top');
  }
</script>

<style lang="scss" scoped>
  .actions {
    @include displayFlex(row, center, center);
  }
</style>

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
    <n-button ghost type="primary" :disabled="isEmpty" @click="push">
      Topo()
    </n-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineEmits, defineProps } from 'vue';
  const emit = defineEmits(['push', 'pop']);
  defineProps<{ isEmpty: boolean }>();

  let newElement = ref<string>('');
  const push = (): void => {
    emit('push', newElement.value);
    newElement.value = '';
  };
  const pop = (): void => {
    emit('pop');
  };
</script>

<style lang="scss" scoped>
  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

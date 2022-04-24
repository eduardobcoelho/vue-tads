<template>
  <ButtonHome></ButtonHome>
  <div class="tad-stack tad-default-box">
    <h1>Pilha</h1>
    <TadStackInput
      :isEmpty="!elements.length"
      @push="push"
      @pop="popOrTop('pop')"
      @top="popOrTop('top')"
    ></TadStackInput>
    <TadStackList :elements="elements"></TadStackList>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import TadStackInput from './TadStackInput.vue';
  import TadStackList from './TadStackList.vue';

  let debounce: number;
  const elements = ref<string[]>([]);
  function push(element: string): void {
    elements.value.unshift(element);
  }
  function popOrTop(slug: string): string {
    const styleClasses = ['shake', `shake__${slug}`];
    const element = elements.value[0];
    const DOMElement = document.getElementById(`0-${element}`);
    DOMElement?.classList.add(...styleClasses);
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      DOMElement?.classList.remove(...styleClasses);
      if (slug === 'pop') elements.value.shift();
    }, 500);
    return element;
  }
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
      margin-bottom: 16px;
    }
  }
</style>

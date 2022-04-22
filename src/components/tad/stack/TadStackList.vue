<template>
  <ul>
    <li
      v-for="(element, index) in elements"
      :key="index"
      :id="`${index}-${element}`"
    >
      {{ element }}
    </li>
    <li id="tad-stack__empty-list" style="border: none" v-if="!elements.length">
      <span>Nenhum elemento foi adicionado!</span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import { defineProps } from 'vue';
  defineProps<{ elements: string[] }>();
</script>

<style lang="scss" scoped>
  ul {
    list-style-type: none;

    li {
      padding: 6px 12px;
      border: 1px solid #18a058;
      border-radius: 8px;
      margin-top: 18px;
      &:not(#tad-stack__empty-list) {
        animation: fade-in 0.7s;
      }
    }
  }

  span {
    color: #afafaf;
  }
</style>

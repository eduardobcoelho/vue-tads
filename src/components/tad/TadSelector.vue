<template>
  <div class="tad-selector">
    <n-button
      v-for="TAD in TADS"
      strong
      type="info"
      :key="TAD.value"
      class="tad-selector__button"
    >
      {{ TAD.name }}
    </n-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';

  export default defineComponent({
    name: 'TadSelector',
    setup() {
      const store = useStore();
      return {
        TADS: computed(() => store.getters.TADS),
      };
    },
  });
</script>

<style lang="scss">
  .tad-selector {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;

    &__button {
      margin: 12px 14px;
    }
  }
</style>

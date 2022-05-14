<template>
  <div class="tad-selector">
    <n-button
      v-for="TAD in TADS"
      dashed
      type="primary"
      :key="TAD.value"
      class="tad-selector__button"
      @click="goToTadView(TAD)"
    >
      {{ TAD.name }}
    </n-button>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { ITAD } from '@/types';

  const store = useStore();
  const router = useRouter();

  let TADS = computed<ITAD[]>(() => store.getters.TADS);
  function goToTadView(TAD: ITAD): void {
    store.commit('setCurrentTad', TAD);
    router.push({ name: 'TAD' });
  }
</script>

<style lang="scss">
  .tad-selector {
    width: 100%;
    max-width: 400px;
    @include displayFlex(row, space-around, flex-start);
    flex-wrap: wrap;
    margin-top: 20px;

    &__button {
      margin: 12px 14px;
    }
  }
</style>

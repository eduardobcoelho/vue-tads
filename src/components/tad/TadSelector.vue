<template>
  <div class="tad-selector">
    <n-button
      v-for="TAD in TADS"
      strong
      type="info"
      :key="TAD.value"
      class="tad-selector__button"
      @click="goToTadView(TAD)"
    >
      {{ TAD.name }}
    </n-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { ITAD } from '@/store/TAD/types';

  export default defineComponent({
    name: 'TadSelector',
    setup() {
      const store = useStore();
      const router = useRouter();
      const goToTadView = (TAD: ITAD): void => {
        store.commit('setCurrentTad', TAD);
        router.push({ name: 'TAD' });
      };
      return {
        TADS: computed<ITAD[]>(() => store.getters.TADS),
        goToTadView,
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

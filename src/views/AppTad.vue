<template>
  <component :is="currentTadComponentName"></component>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { useStore } from 'vuex';

  export default defineComponent({
    name: 'AppTad',
    setup() {
      const store = useStore();

      return {
        currentTadComponentName: computed<string>(
          () => store.getters.currentTad.component,
        ),
      };
    },
  });
</script>

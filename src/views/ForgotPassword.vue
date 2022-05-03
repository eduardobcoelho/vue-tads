<template>
  <div class="tad-default-box forgot-password">
    <ButtonBack></ButtonBack>
    <h1>Recuperação de senha</h1>
    <component :is="stepComponents[step]" @setStep="setStep"></component>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from '@vue/reactivity';
  import ForgotPasswordEmail from '@/components/ForgotPassword/ForgotPasswordEmail.vue';

  const step = ref<number>(1);
  const stepComponents = {
    1: ForgotPasswordEmail,
    2: 'SecondComponent',
    3: 'ThirdComponent',
  };
  function setStep(stepValue: number) {
    step.value = stepValue;
  }
</script>

<style scoped>
  .forgot-password {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h1 {
    margin-bottom: 4px;
  }
</style>

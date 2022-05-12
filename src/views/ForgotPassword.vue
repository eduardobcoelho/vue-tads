<template>
  <div class="tad-default-box forgot-password">
    <ButtonBack v-show="step === 1"></ButtonBack>
    <h1>Recuperação de senha</h1>
    <component :is="stepComponents[step]" @setStep="setStep"></component>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from '@vue/reactivity';
  import ForgotPasswordEmail from '@/components/ForgotPassword/ForgotPasswordEmail.vue';
  import ForgotPasswordSuccess from '@/components/ForgotPassword/ForgotPasswordSuccess.vue';

  const step = ref<number>(1);
  const stepComponents = {
    1: ForgotPasswordEmail,
    2: ForgotPasswordSuccess,
  };
  function setStep(stepValue: number) {
    step.value = stepValue;
  }
</script>

<style lang="scss" scoped>
  .forgot-password {
    @include displayFlex(column, center, center);
  }

  h1 {
    color: $grey;
    margin-bottom: 6px;
  }
</style>

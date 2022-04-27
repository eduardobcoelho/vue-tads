<template>
  <div class="app-cadaster tad-default-box">
    <ButtonBack></ButtonBack>
    <h1>Cadastre-se</h1>
    <div class="app-cadaster__box">
      <n-form ref="loginForm" size="medium" :model="model" :rules="rules">
        <n-form-item
          label="Email"
          path="email"
          label-style="font-weight: bold;"
        >
          <n-input
            type="email"
            v-model:value="model.email"
            placeholder="Digite aqui..."
          ></n-input>
        </n-form-item>
        <n-form-item
          label="Senha"
          path="password"
          label-style="font-weight: bold;"
        >
          <n-input
            type="password"
            v-model:value="model.password"
            placeholder="Digite aqui..."
            show-password-on="click"
          ></n-input>
        </n-form-item>
        <n-form-item
          label="Confirme sua senha"
          path="confirmPassword"
          label-style="font-weight: bold;"
        >
          <n-input
            type="password"
            v-model:value="model.confirmPassword"
            placeholder="Digite aqui..."
            show-password-on="click"
          ></n-input>
        </n-form-item>
        <div class="app-cadaster__actions">
          <n-button type="primary"> Cadastrar </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ICadasterModel, IValidationsObject } from '@/store/Validation/types';
  import { reactive, computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const model = reactive<ICadasterModel>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validations = computed<IValidationsObject>(
    () => store.getters.validations,
  );
  const rules = {
    email: [validations.value.email, validations.value.required],
    password: validations.value.required,
    confirmPassword: validations.value.required,
  };
</script>

<style lang="scss" scoped>
  .app-cadaster {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: start;

    &__box {
      padding: 18px 14px;
      background: white;
      border-radius: 12px;
      box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.5);
      min-width: 280px;
      margin-top: 14px;
    }

    &__actions {
      text-align: center;
    }
  }
</style>

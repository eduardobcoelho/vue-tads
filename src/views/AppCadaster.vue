<template>
  <div class="app-cadaster tad-default-box">
    <ButtonBack></ButtonBack>
    <h1>Cadastre-se</h1>
    <div class="app-cadaster__box">
      <n-form ref="cadasterForm" size="medium" :model="model" :rules="rules">
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
        <n-space v-if="cadasterError" vertical style="margin-bottom: 14px">
          <n-alert closable type="error" @on-close="cadasterError = null">
            {{ cadasterError }}
          </n-alert>
        </n-space>
        <n-space v-if="differentPasswords" vertical style="margin-bottom: 14px">
          <n-alert type="error"> As senhas estão diferentes! </n-alert>
        </n-space>
        <div class="app-cadaster__actions">
          <n-button
            type="primary"
            :loading="loading"
            :disabled="differentPasswords"
            @click="signUp"
          >
            <span>Cadastrar</span>
          </n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { useValidations } from '@/composable';
  import { FormInst } from 'naive-ui';
  import { ICadasterModel } from '@/types';

  const store = useStore();
  const router = useRouter();

  const loading = ref<boolean>(false);
  const cadasterError = ref<string | null>(null);
  const cadasterForm = ref<FormInst | null>(null);
  const model = reactive<ICadasterModel>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const differentPasswords = computed<boolean>(() => {
    if (!model.password || !model.confirmPassword) return false;
    return model.password != model.confirmPassword;
  });
  const rules = {
    email: useValidations('required', 'email'),
    password: useValidations('required'),
    confirmPassword: useValidations('required'),
  };

  function signUp(): void {
    if (cadasterError.value) cadasterError.value = null;
    cadasterForm.value?.validate((errors) => {
      if (!errors) {
        loading.value = true;
        store
          .dispatch('signUp', model)
          .then(() => {
            store.commit('setNotificationSuccessCadaster', true);
            router.push({ name: 'Login' });
          })
          .catch((error: string) => (cadasterError.value = error))
          .finally(() => (loading.value = false));
      }
    });
  }
</script>

<style lang="scss" scoped>
  .app-cadaster {
    @include displayFlex(column, center, center);
    text-align: start;

    &__box {
      width: 100%;
      padding: 18px 14px;
      background: white;
      border-radius: 12px;
      box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.5);
      min-width: 280px;
      max-width: 340px;
      margin-top: 14px;
    }

    &__actions {
      text-align: center;

      span {
        font-weight: bold;
      }
    }
  }
</style>

<template>
  <n-form
    ref="appProfileForm"
    :model="model"
    :rules="rules"
    class="app-profile-form"
  >
    <div class="app-profile-form__input">
      <span>Nome:</span>
      <n-form-item path="displayName" :show-label="false" style="width: 100%">
        <n-input
          v-model:value="model.displayName"
          type="text"
          placeholder="Digite aqui..."
        />
      </n-form-item>
    </div>
    <div class="app-profile-form__input">
      <span>Email:</span>
      <n-form-item path="email" :show-label="false" style="width: 100%">
        <n-input v-model:value="model.email" type="email" disabled />
      </n-form-item>
    </div>
    <div class="app-profile-form__actions">
      <div>
        <n-button @click="openDrawer" tertiary type="primary">
          Alterar senha
        </n-button>
      </div>
      <div>
        <n-button
          tertiary
          type="primary"
          :loading="loading"
          @click="submitForm"
        >
          Salvar alterações
        </n-button>
      </div>
    </div>
  </n-form>
</template>

<script lang="ts" setup>
  import { reactive, ref, withDefaults, defineProps, defineEmits } from 'vue';
  import { User } from 'firebase/auth';
  import { FormInst } from 'naive-ui';
  import { useValidations } from '@/composable';

  interface IProps {
    loading: boolean;
    name?: string | null;
    email: string;
  }
  const props = withDefaults(defineProps<IProps>(), {
    name: '',
  });
  const emit = defineEmits(['submitForm', 'openDrawer']);

  const appProfileForm = ref<FormInst | null>(null);
  const model = reactive<Partial<User>>({
    displayName: props.name,
    email: props.email,
  });
  const rules = {
    displayName: useValidations('required'),
    email: useValidations('required', 'email'),
  };
  function openDrawer() {
    emit('openDrawer');
  }
  function submitForm() {
    appProfileForm.value?.validate((errors) => {
      if (!errors) emit('submitForm', model.displayName);
    });
  }
</script>

<style lang="scss" scoped>
  .app-profile-form {
    width: 100%;
    min-width: 280px;
    max-width: 320px;
    text-align: start;
    @include displayFlex(column, center, center);

    &__input {
      width: 100%;
      margin-top: 12px;
      @include displayFlex(column, auto, flex-start);

      span {
        margin-bottom: 4px;
        font-weight: bold;
        color: $grey;
      }
    }

    &__actions {
      margin-top: 14px;
      @include displayFlex(row, center, center);

      div {
        &:first-child {
          margin-right: 14px;
        }
      }
    }
  }
</style>

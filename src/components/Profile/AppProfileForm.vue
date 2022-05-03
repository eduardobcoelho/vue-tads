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
    <div style="margin-top: 14px">
      <n-button tertiary type="primary" :loading="loading" @click="submitForm">
        Salvar alterações
      </n-button>
    </div>
  </n-form>
</template>

<script lang="ts" setup>
  import { reactive, ref, withDefaults, defineProps, computed } from 'vue';
  import { useStore } from 'vuex';
  import { User, Auth } from 'firebase/auth';
  import { IValidationsObject } from '@/store/Validation/types';
  import { IUser } from '@/store/Auth/types';
  import { FormInst } from 'naive-ui';

  interface IProps {
    name?: string | null;
    email: string;
  }
  const props = withDefaults(defineProps<IProps>(), {
    name: '',
  });
  const store = useStore();
  const appProfileForm = ref<FormInst | null>(null);
  const model = reactive<Partial<User>>({
    displayName: props.name,
    email: props.email,
  });
  const validations = computed<IValidationsObject>(
    () => store.getters.validations,
  );
  const user = computed<IUser>(() => store.getters.user);
  const rules = {
    displayName: [validations.value.required],
    email: [validations.value.required, validations.value.email],
  };
  const loading = ref<boolean>(false);
  function submitForm() {
    appProfileForm.value?.validate((errors) => {
      if (!errors) {
        loading.value = true;
        store
          .dispatch('updateUserProfile', model)
          .then(({ currentUser }: Auth | null) => {
            if (currentUser) setUserNewData(currentUser);
          })
          .finally(() => (loading.value = false));
      }
    });
  }
  function setUserNewData(newUser: User) {
    const newUserData: IUser = user.value;
    newUserData.name = newUser.displayName;
    newUserData.photoURL = newUser.photoURL;
    if (newUser.email) newUserData.email = newUser.email;
    store.commit('setUser', newUserData);
  }
</script>

<style lang="scss" scoped>
  .app-profile-form {
    width: 100%;
    min-width: 280px;
    max-width: 320px;
    text-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__input {
      width: 100%;
      margin-top: 12px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      span {
        margin-bottom: 4px;
        font-weight: bold;
        color: #757575;
      }
    }
  }
</style>

<template>
  <div class="app-profile tad-default-box">
    <ButtonHome></ButtonHome>
    <div class="app-profile__image">
      <img
        v-if="user.photoURL"
        :src="`${user.photoURL}`"
        alt="Foto do usuário"
        title="Foto do usuário"
        width="150"
        height="150"
        referrerpolicy="no-referrer"
      />
      <img
        v-else
        src="@/assets/img/icons/icon-user-placeholder.svg"
        alt="Foto do usuário"
        title="Foto do usuário"
        width="150"
        height="150"
        referrerpolicy="no-referrer"
      />
    </div>
    <AppProfileForm :name="user.name" :email="user.email"></AppProfileForm>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { IUser } from '@/store/Auth/types';
  import AppProfileForm from '@/components/Profile/AppProfileForm.vue';

  const store = useStore();
  const user = computed<IUser>(() => store.getters.user);
</script>

<style lang="scss" scoped>
  .app-profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__image {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      box-sizing: content-box;
      border: 2px solid #1a1a1a;
      overflow: hidden;
      margin-bottom: 8px;
    }
  }
</style>

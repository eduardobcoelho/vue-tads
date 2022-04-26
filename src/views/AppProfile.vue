<template>
  <div class="app-profile tad-default-box">
    <ButtonHome></ButtonHome>
    <div class="app-profile__image">
      <img
        :src="`${user.photoURL}`"
        alt="Foto do usuário"
        title="Foto do usuário"
        width="150"
        height="150"
        referrerpolicy="no-referrer"
      />
    </div>

    <div class="app-profile__credentials">
      <div class="app-profile__input">
        <span>Nome:</span>
        <n-input v-model:value="user.name" type="text" disabled />
      </div>
      <div class="app-profile__input">
        <span>Email:</span>
        <n-input v-model:value="user.email" type="email" disabled />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { IUser } from '@/store/Auth/types';

  const store = useStore();
  let user = computed<IUser>(() => store.getters.user);
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

    &__input {
      width: 100%;
      min-width: 280px;
      max-width: 320px;
      margin-top: 14px;
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

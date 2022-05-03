<template>
  <div class="app-profile tad-default-box">
    <ButtonHome></ButtonHome>
    <AppProfilePictureUploader
      :photoURL="user.photoURL"
    ></AppProfilePictureUploader>
    <AppProfileForm :name="user.name" :email="user.email"></AppProfileForm>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { IUser } from '@/store/Auth/types';

  import AppProfileForm from '@/components/Profile/AppProfileForm.vue';
  import AppProfilePictureUploader from '@/components/Profile/AppProfilePictureUploader.vue';

  const store = useStore();
  const user = computed<IUser>(() => store.getters.user);
</script>

<style lang="scss" scoped>
  .app-profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<template>
  <div class="app-profile tad-default-box">
    <ButtonHome></ButtonHome>
    <AppProfilePictureUploader
      :photoURL="user.photoURL"
      @setPhotoBlob="setPhotoBlob"
    ></AppProfilePictureUploader>
    <AppProfileForm :name="user.name" :email="user.email"></AppProfileForm>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { useStore } from 'vuex';
  import { User } from 'firebase/auth';
  import { IUser } from '@/store/Auth/types';
  import AppProfileForm from '@/components/Profile/AppProfileForm.vue';
  import AppProfilePictureUploader from '@/components/Profile/AppProfilePictureUploader.vue';

  const newUserPhoto = ref<Blob | null>(null);
  const newUserData = reactive<Partial<User>>({
    displayName: '',
    email: '',
    photoURL: '',
  });
  const store = useStore();
  const user = computed<IUser>(() => store.getters.user);

  function setPhotoBlob(photoBlob: Blob) {
    newUserPhoto.value = photoBlob;
  }
</script>

<style lang="scss" scoped>
  .app-profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

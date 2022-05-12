<template>
  <div class="app-profile tad-default-box">
    <ButtonHome></ButtonHome>
    <AppProfilePictureUploader
      :photoURL="user.photoURL"
      @setPhotoBlob="setPhotoBlob"
    ></AppProfilePictureUploader>
    <AppProfileForm
      :loading="loading"
      :name="user.name"
      :email="user.email"
      @submitForm="submitForm"
    ></AppProfileForm>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive } from 'vue';
  import { useStore } from 'vuex';
  import { User, Auth } from 'firebase/auth';
  import { IUser } from '@/store/Auth/types';
  import AppProfileForm from '@/components/Profile/AppProfileForm.vue';
  import AppProfilePictureUploader from '@/components/Profile/AppProfilePictureUploader.vue';

  const store = useStore();
  const user = computed<IUser>(() => store.getters.user);
  const newUserModel = reactive<{
    displayName: string | null;
    photoURL?: Blob | string | null;
  }>({
    displayName: user.value.name,
    photoURL: null,
  });

  const loading = ref<boolean>(false);
  function setPhotoBlob(photoBlob: Blob): void {
    newUserModel.photoURL = photoBlob;
  }
  async function submitForm(displayName: string) {
    loading.value = true;
    newUserModel.displayName = displayName;
    newUserModel.photoURL = await uploaderUserPhoto();
    store
      .dispatch('updateUserProfile', newUserModel)
      .then((firebaseAuth: Auth | null) => {
        if (firebaseAuth && firebaseAuth.currentUser)
          setNewUserDataOnStore(firebaseAuth.currentUser);
      })
      .finally(() => (loading.value = false));
  }
  async function uploaderUserPhoto(): Promise<string | null | undefined> {
    let photo: string | null | undefined = null;
    if (newUserModel.photoURL) {
      await store
        .dispatch('uploaderUserProfileImage', {
          uid: user.value.uid,
          file: newUserModel.photoURL,
        })
        .then(async () => {
          await store
            .dispatch('getUserProfileImage', user.value.uid)
            .then((userPhoto: string) => {
              photo = userPhoto;
            });
        })
        .catch(() => (loading.value = false));
    }
    return photo || user.value.photoURL;
  }
  function setNewUserDataOnStore(newUser: User): void {
    const newUserData: IUser = user.value;
    newUserData.name = newUser.displayName;
    newUserData.photoURL = newUser.photoURL;
    store.commit('setUser', newUserData);
  }
</script>

<style lang="scss" scoped>
  .app-profile {
    @include displayFlex(column, center, center);
  }
</style>

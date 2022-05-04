<template>
  <div id="profile-picture-uploader" @click="uploaderClick">
    <img
      v-show="!props.photoURL && !newPhotoBase64"
      src="@/assets/img/icons/icon-user-placeholder.svg"
      alt="placeholder"
      title="placeholder"
      width="150"
      height="150"
    />
    <input
      type="file"
      ref="ProfilePictureUploaderInput"
      accept="image/*"
      @change="onPickFile"
      style="display: none"
    />
  </div>
</template>

<script setup lang="ts">
  import { defineProps, ref, onMounted } from 'vue';

  interface IProps {
    photoURL: URL | null | string;
  }
  const props = defineProps<IProps>();

  const newPhotoBase64 = ref<string | ArrayBuffer | null>(null);
  const newPhotoBlob = ref<Blob | null>(null);
  const ProfilePictureUploaderInput = ref<HTMLInputElement | null>(null);
  function verifyPhotoURL() {
    const uploader = document.getElementById('profile-picture-uploader');
    if (uploader && props.photoURL)
      uploader.style.backgroundImage = `url(${props.photoURL})`;
  }
  function uploaderClick() {
    if (ProfilePictureUploaderInput.value)
      ProfilePictureUploaderInput.value.click();
  }
  function onPickFile() {
    if (
      ProfilePictureUploaderInput.value &&
      ProfilePictureUploaderInput.value.files
    ) {
      newPhotoBlob.value = ProfilePictureUploaderInput.value.files[0];
      setImageBase64();
    }
  }
  function setImageBase64() {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      newPhotoBase64.value = fileReader.result;
      setUploaderBackground();
    });
    if (newPhotoBlob.value) fileReader.readAsDataURL(newPhotoBlob.value);
  }
  function setUploaderBackground() {
    const uploader = document.getElementById('profile-picture-uploader');
    if (uploader && newPhotoBase64.value) {
      uploader.style.backgroundImage = `url(${newPhotoBase64.value})`;
    }
  }
  onMounted(() => verifyPhotoURL());
</script>

<style lang="scss" scoped>
  #profile-picture-uploader {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-sizing: content-box;
    border: 2px solid #1a1a1a;
    margin-bottom: 8px;
    background-position: center;
    background-size: 100%;
    cursor: pointer;
  }
</style>

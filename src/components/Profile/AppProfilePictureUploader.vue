<template>
  <div id="profile-picture-uploader" @click="uploaderClick">
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

  const ProfilePictureUploaderInput = ref<HTMLInputElement | null>(null);
  function verifyPhotoURL() {
    const uploader = document.getElementById('profile-picture-uploader');
    if (uploader) {
      uploader.style.backgroundImage = `url(${
        props.photoURL || '@/assets/img/icons/icon-user-placeholder.svg'
      })`;
    }
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
      const file: Blob = ProfilePictureUploaderInput.value.files[0];
      setImageBase64(file);
    }
  }
  function setImageBase64(file: Blob) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      const result: string | ArrayBuffer | null = fileReader.result;
      console.log('result: ', result);
      setUploaderBackground(result);
    });
    fileReader.readAsDataURL(file);
  }
  function setUploaderBackground(image: string | ArrayBuffer | null) {
    const uploader = document.getElementById('profile-picture-uploader');
    if (uploader && image) uploader.style.backgroundImage = `url(${image})`;
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

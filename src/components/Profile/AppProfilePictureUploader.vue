<template>
  <div id="profile-picture-uploader" @click="uploaderClick">
    <img
      v-show="!props.photoURL && !photoBase64"
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
  import { defineProps, defineEmits, ref, onMounted } from 'vue';

  interface IProps {
    photoURL?: null | string;
  }
  const props = defineProps<IProps>();
  const emit = defineEmits(['setPhotoBlob']);

  const photoBase64 = ref<string | ArrayBuffer | null>(null);
  const photoBlob = ref<Blob | null>(null);
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
      photoBlob.value = ProfilePictureUploaderInput.value.files[0];
      emit('setPhotoBlob', photoBlob.value);
      setImageBase64();
    }
  }
  function setImageBase64() {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      photoBase64.value = fileReader.result;
      setUploaderBackground();
    });
    if (photoBlob.value) fileReader.readAsDataURL(photoBlob.value);
  }
  function setUploaderBackground() {
    const uploader = document.getElementById('profile-picture-uploader');
    if (uploader && photoBase64.value) {
      uploader.style.backgroundImage = `url(${photoBase64.value})`;
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

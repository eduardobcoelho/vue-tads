<template>
  <div>
    <n-alert title="E-mail enviado" type="success">
      Verifique seu email para acessar o link e modificar sua senha!<br />
      <strong>OBS:</strong> Caso não encontre na sua caixa de entrada, verifique
      a caixa de spam.
    </n-alert>
    <div style="margin-top: 18px">
      <n-button
        @click="router.push({ name: 'Login' })"
        strong
        secondary
        type="primary"
      >
        <template #icon>
          <n-icon>
            <User></User>
          </n-icon>
        </template>
        Login
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { User } from '@vicons/fa';

  const router = useRouter();
</script>

<style lang="scss" scoped>
  h3,
  h4 {
    color: $light-green;
  }
</style>

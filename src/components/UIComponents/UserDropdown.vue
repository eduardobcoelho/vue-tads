<template>
  <n-space vertical>
    <n-dropdown
      placement="bottom-end"
      trigger="click"
      size="large"
      :options="options"
      @select="handleSelect"
    >
      <div class="user-dropdown">
        <img
          :src="`${user.photoURL}`"
          width="40"
          height="40"
          alt="Foto do usuário"
          title="Foto do usuário"
          referrerpolicy="no-referrer"
        />
      </div>
    </n-dropdown>
  </n-space>
</template>

<script lang="ts" setup>
  import { IUser } from '@/store/Auth/types';
  import { h, computed, Component } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { Icon } from '@vicons/utils';
  import { UserAvatarFilled, Logout } from '@vicons/carbon';

  const store = useStore();
  const router = useRouter();

  let user = computed<IUser>(() => store.getters.user);
  const renderIcon = (icon: Component) => {
    return () => {
      return h(
        Icon,
        { style: { fontSize: '20px' } },
        {
          default: () => h(icon),
        },
      );
    };
  };
  const options = [
    {
      label: 'Perfil',
      key: 'profile',
      icon: renderIcon(UserAvatarFilled),
    },
    {
      type: 'divider',
      key: 'd1',
    },
    {
      label: 'Sair',
      key: 'logout',
      icon: renderIcon(Logout),
    },
  ];
  function handleSelect(key: string): void {
    switch (key) {
      case 'logout':
        store.dispatch('logout', false);
        break;
      case 'profile':
        router.push({ name: 'Profile' });
        break;
    }
  }
</script>

<style lang="scss" scoped>
  .user-dropdown {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 15px;
    right: 15px;
    box-sizing: content-box;
    border: 1px solid #1a1a1a;
  }
</style>

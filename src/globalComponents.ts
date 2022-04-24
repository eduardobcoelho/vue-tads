import { Component } from 'vue';
// UI Components
import ButtonHome from '@/components/UIComponents/ButtonHome.vue';
// TADs
import TadStack from '@/components/Tad/stack/TadStack.vue';

const globalComponents: IGlobalComponent[] = [
  {
    name: 'ButtonHome',
    SFC: ButtonHome,
  },
  {
    name: 'TadStack',
    SFC: TadStack,
  },
];

export interface IGlobalComponent {
  name: string;
  SFC: Component;
}

export { globalComponents };

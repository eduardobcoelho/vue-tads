import { Component } from 'vue';
// UI Components
import ButtonBack from '@/components/UIComponents/ButtonBack.vue';
// TADs
import TadStack from '@/components/tad/stack/TadStack.vue';

const globalComponents: IGlobalComponent[] = [
  {
    name: 'ButtonBack',
    SFC: ButtonBack,
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

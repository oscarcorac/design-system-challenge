import type { Meta, StoryFn } from '@storybook/vue3';
import * as Icons from '../';

import IconsGrid from '../IconsGrid.vue';
import type { Icon } from '../types';

export default {
  title: 'Core Ui/Icons/IconsGrid',
  component: IconsGrid,
  argTypes: {},
} as Meta;

const Template: StoryFn<{
  icons: Icon[];
}> = (args) => ({
  components: { IconsGrid },
  setup() {
    return { args };
  },
  template: `
    <IconsGrid v-bind="args" />`,
});

export const All = Template.bind({});
All.args = {
  icons: Object.entries(Icons).map((icon) => ({
    name: icon[0],
    icon: icon[1],
  })),
};

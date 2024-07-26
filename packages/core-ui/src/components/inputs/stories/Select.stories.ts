import type { Meta, StoryFn } from '@storybook/vue3';
import { MuffinSelect, selectSizes } from '../';
import type { SelectProps } from '../';
import { ref } from 'vue';

export default {
  title: 'Core Ui/Components/Inputs/Select',
  component: MuffinSelect,
  argTypes: {
    size: {
      options: selectSizes,
      control: 'select',
    },
    options: {
      control: 'object',
    },
    placeholder: {
      control: 'text',
    },
  },
} as Meta;

const Template: StoryFn<SelectProps> = (args) => ({
  components: { MuffinSelect },
  setup() {
    const selectedOption = ref();

    return { args, selectedOption };
  },
  template: ` <div class="flex flex-col flex-1 w-full">
                <div class="max-w-md w-full mx-auto flex  flex-col gap-1">
                  <MuffinSelect v-bind="args" :selectedOption="selectedOption" @update:selectedOption="(nextOption) => selectedOption = nextOption"/>
                  <div class="text-longform-xs text-secondary">{{'Solo podrás elegir a Victor para continuar.'}}</div>
                </div>
              </div>
            `,
});

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  options: [
    { value: 'jesusmillan@muffin.com', text: 'Jesús Millán' },
    { value: 'maxmendez@muffin.com', text: 'Max Mendez' },
    { value: 'nicholasyepes@muffin.com', text: 'Nicholas Yepes' },
    { value: 'santiaceves@muffin.com', text: 'Santiago Aceves' },
    { value: 'sebasaceves@muffin.com', text: 'Sebastián' },
    { value: 'victordiaz@muffin.com', text: 'Victor Díaz' },
  ],
  placeholder: 'Elige un usuario',
};

import type { Meta, StoryFn } from '@storybook/vue3';
import {
  MfSelect,
  selectSizes,
  selectSort,
  selectVariants,
  selectOptionsSizes,
} from '../';
import type { SelectProps } from '../';
import { ref } from 'vue';

export default {
  title: 'Core Ui/Components/Inputs/Select',
  component: MfSelect,
  argTypes: {
    size: {
      options: selectSizes,
      control: 'select',
      description:
        'Component size, this will modify the box height and padding',
    },
    optionsSize: {
      options: selectOptionsSizes,
      control: 'select',
      description:
        'Component options size, this will modify the options card height',
    },
    options: {
      control: 'object',
      description: 'Component options, this will be passed to the options card',
    },
    placeholder: {
      control: 'text',
      description:
        'Component placeholder, this will shown when no optiin is selected',
    },
    sort: {
      control: 'select',
      options: selectSort,
      description: 'Sorting option to determine the order of items',
    },
    variant: {
      control: 'select',
      options: selectVariants,
      description: 'Component variant to change its appearance',
    },
    emptyOptions: {
      control: 'text',
      description: 'Text to display when there are no available options',
    },
    selectedOption: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: StoryFn<SelectProps> = (args) => ({
  components: { MfSelect },
  setup() {
    const selectedOption = ref();

    return { args, selectedOption };
  },
  template: ` <div class="flex flex-col flex-1 w-full py-12">
                <div class="max-w-md w-full mx-auto flex  flex-col gap-1">
                  <MfSelect v-bind="args" :selectedOption="selectedOption" @update:selectedOption="(nextOption) => selectedOption = nextOption">
                    <template #emptyOptions>
                      {{ args.emptyOptions }}
                    </template>
                  </MfSelect>
                </div>
              </div>
            `,
});

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  optionsSize: 'md',
  options: [
    { value: 'victordiaz@muffin.com', text: 'Victor Díaz' },
    { value: 'sebasaceves@muffin.com', text: 'Sebastián' },
    { value: 'maxmendez@muffin.com', text: 'Max Mendez' },
    { value: 'jesusmillan@muffin.com', text: 'Jesús Millán' },
    { value: 'nicholasyepes@muffin.com', text: 'Nicholas Yepes' },
    { value: 'santiaceves@muffin.com', text: 'Santiago Aceves' },
  ],
  placeholder: 'Elige un usuario',
  emptyOptions: 'No se encontraron usuarios',
};

export const Sorted = Template.bind({});
Sorted.args = {
  size: 'md',
  optionsSize: 'md',
  options: [
    { value: 'victordiaz@muffin.com', text: 'Victor Díaz' },
    { value: 'sebasaceves@muffin.com', text: 'Sebastián' },
    { value: 'maxmendez@muffin.com', text: 'Max Mendez' },
    { value: 'jesusmillan@muffin.com', text: 'Jesús Millán' },
    { value: 'nicholasyepes@muffin.com', text: 'Nicholas Yepes' },
    { value: 'santiaceves@muffin.com', text: 'Santiago Aceves' },
  ],
  placeholder: 'Elige un usuario',
  emptyOptions: 'No se encontraron usuarios',
  sort: 'alphabetical',
};

export const Search = Template.bind({});
Search.args = {
  size: 'md',
  optionsSize: 'md',
  options: [
    { value: 'victordiaz@muffin.com', text: 'Victor Díaz' },
    { value: 'sebasaceves@muffin.com', text: 'Sebastián' },
    { value: 'maxmendez@muffin.com', text: 'Max Mendez' },
    { value: 'jesusmillan@muffin.com', text: 'Jesús Millán' },
    { value: 'nicholasyepes@muffin.com', text: 'Nicholas Yepes' },
    { value: 'santiaceves@muffin.com', text: 'Santiago Aceves' },
  ],
  placeholder: 'Elige un usuario',
  emptyOptions: 'No se encontraron usuarios',
  variant: 'search',
};

export const SearchAndSorted = Template.bind({});
SearchAndSorted.args = {
  size: 'md',
  optionsSize: 'md',
  options: [
    { value: 'victordiaz@muffin.com', text: 'Victor Díaz' },
    { value: 'sebasaceves@muffin.com', text: 'Sebastián' },
    { value: 'maxmendez@muffin.com', text: 'Max Mendez' },
    { value: 'jesusmillan@muffin.com', text: 'Jesús Millán' },
    { value: 'nicholasyepes@muffin.com', text: 'Nicholas Yepes' },
    { value: 'santiaceves@muffin.com', text: 'Santiago Aceves' },
  ],
  placeholder: 'Elige un usuario',
  emptyOptions: 'No se encontraron usuarios',
  sort: 'alphabetical',
  variant: 'search',
};

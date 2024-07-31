import type { Meta, StoryFn } from '@storybook/vue3';
import { FormRowProps, MfFormRow, MfSelect, formRowSizes } from '../';
import { ref } from 'vue';

export default {
  title: 'Core Ui/Components/Inputs/FormRow',
  component: MfFormRow,
  argTypes: {
    size: {
      control: 'select',
      options: formRowSizes,
      description:
        'The size of the form row. Choose from predefined size options.',
    },
    description: {
      control: 'text',
      description:
        'A description text that will be displayed below the input field.',
    },
    default: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: StoryFn<FormRowProps> = (args) => ({
  components: { MfFormRow, MfSelect },
  setup() {
    const selectedOption = ref();

    return { args, selectedOption };
  },
  template: ` <div class="flex flex-col flex-1 w-full py-12">
                <div class="max-w-md w-full mx-auto flex flex-col gap-4">
                  <MfFormRow v-bind="args" class="pointer-events-none" size="md">
                    <MfSelect size="md" placeholder="This is a select"/>
                    <template #description>
                        {{args.description}}
                    </template>
                  </MfFormRow>
                </div>
              </div>
            `,
});

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  description: 'This a description for the input field',
};

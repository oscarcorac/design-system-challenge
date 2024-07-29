import type { Meta, StoryFn } from '@storybook/vue3';
import { MfFormRow, MfSelect } from '../';
// import type { SelectProps } from '../';
import { ref } from 'vue';

export default {
  title: 'Core Ui/Components/Inputs/FormRow',
  component: MfFormRow,
  argTypes: {},
} as Meta;

const Template: StoryFn<{}> = (args) => ({
  components: { MfFormRow, MfSelect },
  setup() {
    const selectedOption = ref();

    return { args, selectedOption };
  },
  template: ` <div class="flex flex-col flex-1 w-full py-12">
                <div class="max-w-md w-full mx-auto flex flex-col gap-4">
                  <MfFormRow class="pointer-events-none" size="md">
                    <MfSelect size="md" placeholder="This is a select"/>
                    <template #description>
                        {{'This a description for the input field'}}
                    </template>
                  </MfFormRow>
                   <MfFormRow class="pointer-events-none" size="md">
                    <MfSelect size="md" placeholder="This another select"/>
                    <template #description>
                        {{'This a description for the input field'}}
                    </template>
                  </MfFormRow>
                </div>
              </div>
            `,
});

export const Default = Template.bind({});
Default.args = {};

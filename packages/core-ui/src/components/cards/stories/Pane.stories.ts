import type { Meta, StoryFn } from '@storybook/vue3';
import { MfPane, paneRadiusSizes } from '../';
import type { PaneProps } from '../';
import { ref } from 'vue';

export default {
  title: 'Core Ui/Components/Cards/Pane',
  component: MfPane,
  argTypes: {
    radiusSize: {
      options: paneRadiusSizes,
      control: 'select',
      description:
        'Component size, this will modify the box height and padding',
    },
    slotImg: {
      control: 'text',
      description:
        'Component content, this will add an image to the default slot',
    },
    default: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: StoryFn<PaneProps & { slotImg: string }> = (args) => ({
  components: { MfPane },
  setup() {
    const selectedOption = ref();
    const { slotImg, ...paneArgs } = args;

    return { slotImg, paneArgs, selectedOption };
  },
  template: `   <div class="flex flex-col flex-1 w-full py-12">
                    <div class="max-w-md w-full mx-auto flex flex-col">
                        <MfPane  class="max-w-md p-4 gap-4" v-bind="paneArgs">
                            <img :src="slotImg"/>
                        </MfPane>
                    <div/>
                </div>
            `,
});

export const Default = Template.bind({});
Default.args = {
  radiusSize: 'md',
  slotImg: 'https://placehold.co/400x200',
};

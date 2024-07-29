import type { Meta, StoryFn } from '@storybook/vue3';
import { MfPane, paneRadiusSizes } from '../';
import type { PaneProps } from '../';

export default {
  title: 'Core Ui/Components/Cards/Pane',
  component: MfPane,
  argTypes: {
    radiusSize: {
      options: paneRadiusSizes,
      control: 'select',
      description:
        'Defines the radius size of the pane component. Choose from predefined options like small, medium, or large.',
    },
    default: {
      control: 'text',
      description:
        'URL of the image to be displayed inside the pane. This will render as an <img> element.',
    },
  },
} as Meta;

const Template: StoryFn<PaneProps & { slotImg: string }> = (args) => ({
  components: { MfPane },
  setup() {
    return { args };
  },
  template: `   <div class="flex flex-col flex-1 w-full py-12 mx-12">
                    <div class="w-full flex flex-col gap-4">
                        <MfPane class="max-w-xs p-4 gap-4" v-bind="paneArgs">
                          <img :src="args.default">
                        </MfPane>
                        <MfPane  class="max-w-sm p-4 gap-4" v-bind="paneArgs">
                          <img :src="args.default">
                        </MfPane>
                        <MfPane  class="max-w-md p-4 gap-4" v-bind="paneArgs">
                          <img :src="args.default">
                        </MfPane>
                      </div>
                </div>
            `,
});

export const Default = Template.bind({});
Default.args = {
  radiusSize: 'md',
  default: 'https://placehold.co/400x200',
};

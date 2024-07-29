import type { Meta, StoryFn } from '@storybook/vue3';
import { MfListItem, MfPane, listItemSizes, listItemVariants } from '../../..';
import type { ListItemProps } from '../../..';

export default {
  title: 'Core Ui/Components/List/ListItem',
  component: MfListItem,
  argTypes: {
    size: {
      options: listItemSizes,
      control: 'select',
      description: '',
    },
    variant: {
      options: listItemVariants,
      control: 'select',
      description: '',
    },
  },
} as Meta;

const Template: StoryFn<ListItemProps> = (args) => ({
  components: { MfListItem, MfPane },
  setup() {
    return { args };
  },
  template: `   <div class="flex flex-col flex-1 w-full py-12">
                    <div class="max-w-md w-full mx-auto flex flex-col">
                        <MfPane radiusSize="md">
                            <MfListItem  class="max-w-md p-4 gap-4" v-bind="args">
                                {{'This is a list item'}}
                                <template #rightIcon>
                                    {{'👋'}}
                                </template>
                            </MfListItem>
                        </MfPane>
                    </div>
                </div>
            `,
});

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  variant: 'default',
};

export const Menu = Template.bind({});
Menu.args = {
  size: 'md',
  variant: 'menu',
};

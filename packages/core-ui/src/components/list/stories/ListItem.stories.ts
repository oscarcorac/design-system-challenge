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
      description: 'Select the size of the component from predefined options.',
    },
    variant: {
      options: listItemVariants,
      control: 'select',
      description: 'Choose the variant of the component.',
    },
    default: {
      control: 'text',
      description: 'Provide text content for the default slot.',
    },
    rightIcon: {
      control: 'select',
      options: ['✋', '👋', '🖐', '🖖', '🤚', undefined],
      description:
        'Select an icon to display on the right side of the component.',
    },
  },
} as Meta;

const Template: StoryFn<
  ListItemProps & { default: string; rightIcon: string }
> = (args) => ({
  components: { MfListItem, MfPane },
  setup() {
    return { args };
  },
  template: `   <div class="flex flex-col flex-1 w-full py-12">
                    <div class="max-w-md w-full mx-auto flex flex-col">
                        <MfPane radiusSize="md">
                            <MfListItem class="max-w-md p-4 gap-4" v-bind="args">
                                {{args.default}}
                                <template #rightIcon>
                                    {{args.rightIcon}}
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
  default: 'Hello from list default slot',
};

export const DefaultWithIcon = Template.bind({});
DefaultWithIcon.args = {
  size: 'md',
  variant: 'default',
  default: 'Hello from list default slot',
  rightIcon: '👋',
};

export const Menu = Template.bind({});
Menu.args = {
  size: 'md',
  variant: 'menu',
  default: 'Hello from list default slot',
};

export const MenuWithIcon = Template.bind({});
MenuWithIcon.args = {
  size: 'md',
  variant: 'menu',
  default: 'Hello from list default slot',
  rightIcon: '👋',
};

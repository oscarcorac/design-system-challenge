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
    leftIcon: {
      control: 'select',
      options: ['🇺🇸', undefined],
      description:
        'Select an icon to display on the left side of the component.',
    },
    default: {
      control: 'text',
      description: 'Provide text content for the default slot.',
    },
    rightIcon: {
      control: 'select',
      options: ['🇺🇸', undefined],
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
                    <div class="max-w-xs w-full mx-auto flex flex-col">
                        <MfPane radiusSize="md">
                            <MfListItem v-bind="args">
                                <template #leftIcon>
                                    {{args.leftIcon}}
                                </template>
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
  default: 'United States ',
};

export const Menu = Template.bind({});
Menu.args = {
  size: 'md',
  variant: 'menu',
  default: 'United States ',
};

export const DefaultWithRightIcon = Template.bind({});
DefaultWithRightIcon.args = {
  size: 'md',
  variant: 'default',
  default: 'United States ',
  rightIcon: '🇺🇸',
};

export const DefaultWithLeftIcon = Template.bind({});
DefaultWithLeftIcon.args = {
  size: 'md',
  variant: 'default',
  default: 'United States ',
  leftIcon: '🇺🇸',
};

export const DefaultWithBothIcons = Template.bind({});
DefaultWithBothIcons.args = {
  size: 'md',
  variant: 'default',
  default: 'United States ',
  leftIcon: '🇺🇸',
  rightIcon: '🇺🇸',
};

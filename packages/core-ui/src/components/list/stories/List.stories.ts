import type { Meta, StoryFn } from '@storybook/vue3';
import {
  MfList,
  MfListItem,
  MfPane,
  listPaddingSizes,
  listSizes,
} from '../../..';
import type { ListProps } from '../../..';

export default {
  title: 'Core Ui/Components/List/List',
  component: MfList,
  argTypes: {
    size: {
      options: listSizes,
      control: 'select',
      description:
        'Select the spacing size of the component from predefined options.',
    },
    padding: {
      options: listPaddingSizes,
      control: 'select',
      description:
        'Select the padding size for the component from predefined options.',
    },
    listData: {
      control: 'object',
      description:
        'An array of objects representing the list items, where each object contains `value` and `icon`',
    },
    default: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

const Template: StoryFn<ListProps> = (args) => ({
  components: { MfList, MfListItem, MfPane },
  setup() {
    return { args };
  },
  template: `   <div class="flex flex-col flex-1 w-full py-12">
                    <div class="max-w-xs w-full mx-auto flex flex-col">
                        <MfPane radiusSize="md">
                            <MfList v-bind="args">
                                <MfListItem v-for="data in args.listData" size="md" variant="default">
                                    {{data.value}}

                                    <template #rightIcon>
                                        {{data.icon}}
                                    </template>
                                </MfListItem>
                              </MfList>
                        </MfPane>
                    </div>
                </div>
            `,
});

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  padding: 'md',
  listData: [
    { value: 'United States', icon: '🇺🇸' },
    { value: 'Canada', icon: '🇨🇦' },
    { value: 'Germany', icon: '🇩🇪' },
    { value: 'Japan', icon: '🇯🇵' },
    { value: 'Brazil', icon: '🇧🇷' },
    { value: 'Australia', icon: '🇦🇺' },
  ],
};

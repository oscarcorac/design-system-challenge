import { nextTick, reactive, ref, toRef } from 'vue';
import { SelectOption, SelectProps } from './types';

export function useManageOptionsState(
  props: Pick<SelectProps, 'selectedOption' | 'options'>,
  handlers: {
    onAfterShowOptions: () => void;
    onAfterHideOptions: () => void;
  }
) {
  const isOptionsMenuOpened = ref(false);
  const dirtyOption = ref<SelectOption | null>(null);

  const isSomeOptionSelected = toRef(() => Boolean(props.selectedOption));
  const isSomeOptionDirty = toRef(() => Boolean(dirtyOption.value));

  function isOptionSelected(option: SelectOption) {
    return option.value === props.selectedOption?.value;
  }

  function isOptionDirty(option: SelectOption) {
    return option.value === dirtyOption.value?.value;
  }

  function isOptionActive(option: SelectOption) {
    return (
      isOptionDirty(option) ||
      (!isSomeOptionDirty.value && isOptionSelected(option))
    );
  }

  function setDirtyOption(option: SelectOption | null) {
    dirtyOption.value = option;
  }

  async function showOptions() {
    isOptionsMenuOpened.value = true;

    await nextTick();
    handlers.onAfterShowOptions();
  }

  async function hideOptions() {
    isOptionsMenuOpened.value = false;

    await nextTick();
    handlers.onAfterHideOptions();
  }

  return [
    reactive({
      isOptionsMenuOpened,
      dirtyOption,
      isSomeOptionSelected,
      isSomeOptionDirty,
    }),
    {
      showOptions,
      hideOptions,
      isOptionDirty,
      isOptionSelected,
      isOptionActive,
      setDirtyOption,
    },
  ] as const;
}

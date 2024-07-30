import { reactive, ref, toRef } from 'vue';
import { SelectOption, SelectProps } from './types';

export function useSelectOptionsState(
  props: Pick<SelectProps, 'selectedOption' | 'options'>,
  handlers: {
    onShowOptions: () => Promise<void>;
    onHideOptions: () => void;
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

  function setDirtyOption(option: SelectOption | null) {
    dirtyOption.value = option;
  }

  function showOptions() {
    isOptionsMenuOpened.value = true;
    handlers.onShowOptions();
  }

  function hideOptions() {
    isOptionsMenuOpened.value = false;
    handlers.onHideOptions();
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
      setDirtyOption,
    },
  ] as const;
}

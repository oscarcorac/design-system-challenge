import { reactive, ref, toRef } from 'vue';
import { SelectOption, SelectProps } from './types';
import { onClickOutside, useDebounceFn } from '@vueuse/core';

export function useOptionSelection(
  props: Pick<SelectProps, 'selectedOption' | 'options'> & {
    selectOptionsRef: HTMLInputElement | null;
  },
  handlers: {
    onShowOptions: () => Promise<void>;
    onHideOptions: () => void;
    onSelectOption: (option: SelectOption) => void;
  }
) {
  const isOptionsMenuOpened = ref(false);
  const dirtyOption = ref<SelectOption | null>(null);

  const isSomeOptionSelected = toRef(() => Boolean(props.selectedOption));
  const isSomeOptionDirty = toRef(() => Boolean(dirtyOption.value));

  const useDebounceSelection = useDebounceFn((callback: () => void) => {
    callback();
  }, 400);

  function isOptionSelected(option: SelectOption) {
    return option.value === props.selectedOption?.value;
  }

  function isOptionDirty(option: SelectOption) {
    return option.value === dirtyOption.value?.value;
  }

  function showOptions() {
    isOptionsMenuOpened.value = true;
    handlers.onShowOptions();
  }

  function hideOptions() {
    isOptionsMenuOpened.value = false;
    handlers.onHideOptions();
  }

  function selectOption(option: SelectOption) {
    dirtyOption.value = option;
    useDebounceSelection(() => {
      hideOptions();
      dirtyOption.value = null;
      handlers.onSelectOption(option);
    });
  }

  onClickOutside(
    toRef(() => props.selectOptionsRef),
    () => hideOptions()
  );

  return [
    reactive({
      isOptionsMenuOpened,
      dirtyOption,
      isSomeOptionSelected,
      isSomeOptionDirty,
    }),
    { selectOption, showOptions, hideOptions, isOptionDirty, isOptionSelected },
  ] as const;
}

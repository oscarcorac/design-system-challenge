import { reactive, toRef } from 'vue';
import { SelectOption, SelectProps, SelectSort } from './types';

export function useSortSelectOptions(
  props: Pick<SelectProps, 'selectedOption' | 'options' | 'sort'>
) {
  // Computed
  const sortedOptions = toRef(() =>
    sortOptions(props.options, props.selectedOption, props.sort)
  );

  // Sort Fn
  function sortByName(options: SelectOption[]): SelectOption[] {
    return options.sort((a, b) => a.text.localeCompare(b.text));
  }

  function sortSelectionFirst(
    options: SelectOption[],
    selectedOption?: SelectOption
  ) {
    const filteredOptions = options.filter(
      (option) => option.value !== selectedOption?.value
    );

    const sortedOptions = selectedOption
      ? [selectedOption, ...filteredOptions]
      : filteredOptions;

    return sortedOptions;
  }

  function sortOptions(
    options: SelectOption[],
    selectedOption?: SelectOption,
    sort?: SelectSort
  ) {
    let sortedOptions = options;

    if (sort === 'alphabetical') {
      sortedOptions = sortByName(sortedOptions);
    }

    sortedOptions = sortSelectionFirst(sortedOptions, selectedOption);

    return sortedOptions;
  }

  return [
    reactive({
      sortedOptions,
    }),
    {},
  ] as const;
}

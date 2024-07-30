import { reactive, ref, toRef } from 'vue';
import { SelectOption, SelectProps, SelectSort } from './types';
import { useDebounceFn } from '@vueuse/core';

export function useSearchControls(
  props: Pick<SelectProps, 'selectedOption' | 'options' | 'sort'>
) {
  const search = ref('');

  const useDebounceFiltering = useDebounceFn((callback: () => void) => {
    callback();
  }, 400);

  function setSearch(value: string) {
    search.value = value;
  }

  function sortOptionsByName(options: SelectOption[]): SelectOption[] {
    return options.sort((a, b) => a.text.localeCompare(b.text));
  }

  function sortSelectionFirst(options: SelectOption[]) {
    const filteredOptions = options.filter(
      (option) => option.value !== props.selectedOption?.value
    );

    const sortedOptions = props.selectedOption
      ? [props.selectedOption, ...filteredOptions]
      : filteredOptions;

    return sortedOptions;
  }

  function sortOptions(options: SelectOption[], sort?: SelectSort) {
    let sortedOptions = options;

    if (sort === 'alphabetical') {
      sortedOptions = sortOptionsByName(sortedOptions);
    }

    sortedOptions = sortSelectionFirst(sortedOptions);

    return sortedOptions;
  }

  function normalizeString(str: string) {
    return str
      .toLocaleLowerCase()
      .replace(/\s+/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function filterOptions(options: SelectOption[], search: string) {
    return options.filter((value) =>
      normalizeString(value.text).includes(normalizeString(search))
    );
  }

  function handleInputChange(event: Event) {
    const { value } = event.currentTarget as HTMLInputElement;

    useDebounceFiltering(() => {
      setSearch(value);
    });
  }

  return [
    reactive({
      options: toRef(() => {
        const sortedOptions = sortOptions(props.options, props.sort);
        return filterOptions(sortedOptions, search.value);
      }),
    }),
    {
      setSearch,
      handleInputChange,
    },
  ] as const;
}

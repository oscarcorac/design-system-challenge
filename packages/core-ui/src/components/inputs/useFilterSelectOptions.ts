import { reactive, ref, toRef } from 'vue';
import { SelectOption, SelectProps } from './types';

export function useFilterSelectOptions(
  props: Pick<SelectProps, 'options' | 'sort'>
) {
  // Refs
  const search = ref('');

  // Computed
  const processedOptions = toRef(() => {
    return filterOptions(props.options, search.value);
  });

  const isProcessedOptionsListEmpty = toRef(
    () => !Boolean(processedOptions.value.length)
  );

  // Fn
  function setSearch(value: string) {
    search.value = value;
  }

  function normalizeString(str: string) {
    return str
      .toLocaleLowerCase()
      .replace(/\s+/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function filterOptions(options: SelectOption[], search: string) {
    const normalizedSearch = normalizeString(search);

    return options.filter((option) => {
      const normalizedOption = normalizeString(option.text);
      return normalizedOption.includes(normalizedSearch);
    });
  }

  return [
    reactive({
      processedOptions,
      isProcessedOptionsListEmpty,
    }),
    {
      setSearch,
    },
  ] as const;
}

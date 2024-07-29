export const selectSizes = ['md' /* More sizes to be added here */] as const;
export type SelectSize = (typeof selectSizes)[number];

export const selectSort = ['alphabetical'] as const;
export type SelectSort = (typeof selectSort)[number];

export type SelectOption = {
  value: string;
  text: string;
};

export const selectVariants = ['search'] as const;
export type SelectVariant = (typeof selectVariants)[number];

export type SelectProps = {
  size: SelectSize;
  options: SelectOption[];
  sort?: SelectSort;
  selectedOption?: SelectOption;
  placeholder?: string;
  variant?: SelectVariant;
};

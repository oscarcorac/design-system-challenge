export const selectSizes = ['md'] as const;
export type SelectSize = (typeof selectSizes)[number];

export const selectSort = ['alphabetical'] as const;
export type SelectSort = (typeof selectSort)[number];

export type SelectOption = {
  value: string;
  text: string;
  icon?: string;
};

export const selectVariants = ['search'] as const;
export type SelectVariant = (typeof selectVariants)[number];

export const selectOptionsSizes = ['md'] as const;
export type SelectOptionsSize = (typeof selectOptionsSizes)[number];

export type SelectProps = {
  size: SelectSize;
  options: SelectOption[];
  optionsSize: SelectOptionsSize;
  sort?: SelectSort;
  selectedOption?: SelectOption;
  placeholder?: string;
  variant?: SelectVariant;
};

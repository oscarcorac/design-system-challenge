export const selectSizes = ['md' /* More sizes to be added here */] as const;
export type SelectSize = (typeof selectSizes)[number];

export type SelectOption = {
  value: string;
  text: string;
};

export type SelectProps = {
  size: SelectSize;
  options: SelectOption[];
  selectedOption?: SelectOption,
  placeholder? :string
};

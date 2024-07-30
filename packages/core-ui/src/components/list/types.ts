export const listItemSizes = ['md'] as const;
export type ListItemSize = (typeof listItemSizes)[number];

export const listItemVariants = ['default', 'menu'] as const;
export type ListItemVariant = (typeof listItemVariants)[number];

export type ListItemProps = {
  size: ListItemSize;
  variant: ListItemVariant;
};

export const listSizes = ['md'] as const;
export type ListSize = (typeof listSizes)[number];

export const listPaddingSizes = ['md'] as const;
export type ListPaddingSize = (typeof listSizes)[number];

export type ListProps = {
  size: ListSize;
  padding: ListPaddingSize;
};

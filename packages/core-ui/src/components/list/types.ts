export const listItemSizes = ['md'] as const;
export type ListItemSize = (typeof listItemSizes)[number];

export const listItemVariants = ['default', 'menu'] as const;
export type ListItemVariant = (typeof listItemVariants)[number];

export type ListItemProps = {
  size: ListItemSize;
  variant: ListItemVariant;
};

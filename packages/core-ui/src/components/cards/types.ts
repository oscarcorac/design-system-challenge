export const paneRadiusSizes = ['md'] as const;
export type PaneRadiusSize = (typeof paneRadiusSizes)[number];

export type PaneProps = {
  radiusSize: PaneRadiusSize;
};

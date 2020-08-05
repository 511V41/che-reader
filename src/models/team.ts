export interface OKE {
  name: string;
  nickname: string;
  position?: number;
}

export interface Team {
  name: string;
  owner: string;
  okes: (OKE | undefined)[];
  emblem: Emblem | undefined;
}

export interface ColorPaletteSlot {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type ColorPalette = ColorPaletteSlot[];

export interface Emblem {
  colorPalette: ColorPalette;
  image: string;
}

export interface ContentOfList {
  filename: string;
  team: Team | undefined;
}

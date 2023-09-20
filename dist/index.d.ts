import { variants } from '@catppuccin/palette';
import { Extension } from '@codemirror/state';
import { HighlightStyle } from '@codemirror/language';
export type Variant = keyof typeof variants;
export declare function catppuccinTheme(variant: Variant): Extension;
export declare function catppuccinHighlightStyle(variant: Variant): HighlightStyle;
export declare function catppuccin(variant: Variant): Extension;

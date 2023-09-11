import { variants } from '@catppuccin/palette'
import { EditorView } from '@codemirror/view'
import { Extension } from '@codemirror/state'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { tags as t } from '@lezer/highlight'
import { TinyColor } from '@ctrl/tinycolor'

// Style guide:
// - https://github.com/catppuccin/catppuccin/blob/main/docs/style-guide.md

// Attempt using references for as reference for the colors:
// - nvim: https://github.com/catppuccin/nvim
//   - Editor: https://github.com/catppuccin/nvim/blob/main/lua/catppuccin/groups/editor.lua
//   - Highlight: https://github.com/catppuccin/nvim/blob/main/lua/catppuccin/groups/syntax.lua
// - vscode: https://github.com/catppuccin/vscode/
//   - https://github.com/catppuccin/vscode/blob/main/src/theme/uiColors.ts

type Variant = keyof typeof variants
type Palette = (typeof variants)[Variant]

/// The editor theme styles for Catppuccin.
export function catppuccinTheme(variant: Variant) {
  const palette: Palette = variants[variant]

  const bg = palette.base.hex
  const fg = palette.text.hex
  const caret = palette.rosewater.hex
  const selectionBg = palette.surface2.hex
  const selectionMatchBg = new TinyColor(palette.text.hex).setAlpha(0.07).toHex()
  const searchMatchBg = palette.red.hex
  const searchMatchSelectedBg = new TinyColor(palette.sky.hex).darken(30).toHex()
  const searchMatchOutline = 'none' // ?
  const lineHighlight = palette.surface0.hex
  const gutterBg = palette.crust.hex // ?
  const gutterFg = palette.text.hex // ?
  const gutterActiveFg = palette.surface1.hex // ?
  const gutterActiveBg = palette.text.hex // ?
  const gutterBorder = 'none' // ?
  const panelsBg = palette.surface1.hex // ?
  const panelsFg = palette.mantle.hex // ?
  const foldPlaceholderFg = palette.blue.hex // ?
  const tooltipBg = new TinyColor(palette.mantle.hex).setAlpha(0.75).toHex()
  const tooltipAutocompleteSelectedFg = palette.mantle.hex
  const tooltipAutocompleteSelectedBg = palette.surface1.hex

  return EditorView.theme({
    '&': {
      color: fg,
      backgroundColor: bg,
    },

    '.cm-content': {
      caretColor: caret,
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: caret },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
      { backgroundColor: selectionBg },
    '.cm-selectionMatch': { backgroundColor: selectionMatchBg },

    '.cm-panels': { backgroundColor: panelsBg, color: panelsFg },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

    '.cm-searchMatch': {
      backgroundColor: searchMatchBg,
      outline: searchMatchOutline, // ?
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: searchMatchSelectedBg,
    },

    '.cm-activeLine': { backgroundColor: lineHighlight },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: '#bad0f847',
    },

    '.cm-gutters': {
      color: gutterFg,
      backgroundColor: gutterBg,
      border: gutterBorder,
    },

    '.cm-activeLineGutter': {
      color: gutterActiveFg,
      backgroundColor: gutterActiveBg,
    },

    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: foldPlaceholderFg,
    },

    '.cm-tooltip': {
      border: 'none',
      backgroundColor: tooltipBg,
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: tooltipBg,
      borderBottomColor: tooltipBg,
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: tooltipAutocompleteSelectedBg,
        color: tooltipAutocompleteSelectedFg,
      },
    },
  })
}

/// The highlighting style for code in the Catppuccin theme.
export function catppuccinHighlightStyle(variant: Variant) {
  const palette: Palette = variants[variant]

  return HighlightStyle.define([
    // keyword
    { tag: [t.keyword, t.bool], color: palette.mauve.hex },
    // string
    {
      tag: [t.processingInstruction, t.string, t.inserted],
      color: palette.green.hex,
    },
    // escape sequences
    {
      tag: [t.escape, t.regexp, t.special(t.string)],
      color: palette.pink.hex,
    },
    // comments
    { tag: [t.comment], color: palette.overlay0.hex },
    // constants, numbers
    {
      tag: [t.number, t.atom, t.color, t.constant(t.name), t.standard(t.name)],
      color: palette.peach.hex,
    },
    // operators
    { tag: [t.operator, t.operatorKeyword], color: palette.sky.hex },
    // braces, delimiters
    { tag: [t.deleted, t.character, t.separator], color: palette.overlay2.hex },
    // methods, functions
    { tag: [t.function(t.variableName), t.labelName], color: palette.blue.hex },
    // parameters
    {
      tag: [t.propertyName, t.macroName],
      color: palette.maroon.hex,
    },
    // local variables
    {
      tag: [t.special(t.variableName), t.definition(t.name), t.name],
      color: palette.teal.hex,
    },
    // built-ins

    // classes, metadata
    {
      tag: [t.meta, t.typeName, t.className, t.annotation, t.modifier, t.self, t.namespace],
      color: palette.yellow.hex,
    },
    // link
    {
      tag: [t.url, t.link],
      color: palette.sky.hex,
      textDecoration: 'underline',
    },
    // other
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.heading, fontWeight: 'bold', color: palette.lavender.hex },
    { tag: t.invalid, color: palette.red.hex },
  ])
}

/// Extension to enable the Catppuccin theme (both the editor theme and
/// the highlight style).
export function catppuccin(variant: Variant): Extension {
  return [catppuccinTheme(variant), syntaxHighlighting(catppuccinHighlightStyle(variant))]
}

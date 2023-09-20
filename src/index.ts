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

export type Variant = keyof typeof variants
type Palette = (typeof variants)[Variant]

const isDark: Record<Variant, boolean> = {
  latte: false,
  frappe: true,
  macchiato: true,
  mocha: true,
}

/// The editor theme styles for Catppuccin.
export function catppuccinTheme(variant: Variant) {
  const palette: Palette = variants[variant]

  const bg = palette.base.hex
  const fg = palette.text.hex
  const caret = palette.rosewater.hex
  const selectionBg = palette.surface2.hex
  const selectionMatchBg = new TinyColor(palette.text.hex).setAlpha(0.2).toHex8String()
  const searchMatchBg = palette.red.hex
  const searchMatchSelectedBg = new TinyColor(palette.sky.hex)
    .darken(30)
    .setAlpha(0.2)
    .toHex8String()
  const searchMatchOutline = 'none' // ?
  const activeLine = new TinyColor(palette.surface0.hex).setAlpha(0.2).toHex8String()
  const gutterBg = palette.crust.hex // ?
  const gutterFg = palette.text.hex // ?
  const gutterActiveFg = palette.surface1.hex // ?
  const gutterActiveBg = palette.text.hex // ?
  const gutterBorder = 'none' // ?
  const panelsBg = palette.surface1.hex // ?
  const panelsFg = palette.mantle.hex // ?
  const foldPlaceholderFg = palette.blue.hex // ?
  const tooltipBg = new TinyColor(palette.mantle.hex).setAlpha(0.75).toHex8String()
  const tooltipAutocompleteSelectedFg = palette.mantle.hex
  const tooltipAutocompleteSelectedBg = palette.surface1.hex
  const focusedBg = new TinyColor(palette.sapphire.hex).setAlpha(0.5).toHex8String()

  return EditorView.theme(
    {
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

      '.cm-activeLine': { backgroundColor: activeLine },

      '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: focusedBg,
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
    },
    {
      dark: isDark[variant],
    },
  )
}

// - https://github.com/catppuccin/nvim/blob/main/lua/catppuccin/groups/syntax.lua
// - https://github.com/catppuccin/vscode/blob/main/src/theme/tokens/index.ts

/// The highlighting style for code in the Catppuccin theme.
export function catppuccinHighlightStyle(variant: Variant) {
  const palette: Palette = variants[variant]

  return HighlightStyle.define([
    { tag: t.comment, color: palette.overlay0.hex },
    { tag: t.lineComment, color: palette.overlay0.hex },
    { tag: t.blockComment, color: palette.overlay0.hex },
    { tag: t.docComment, color: palette.overlay0.hex },
    { tag: t.name, color: palette.flamingo.hex },
    { tag: t.variableName, color: palette.flamingo.hex },
    { tag: t.typeName, color: palette.yellow.hex },
    { tag: t.tagName, color: palette.lavender.hex },
    { tag: t.propertyName, color: palette.teal.hex },
    { tag: t.attributeName, color: palette.teal.hex },
    { tag: t.className, color: palette.yellow.hex },
    { tag: t.labelName, color: palette.sapphire.hex },
    { tag: t.namespace, color: palette.yellow.hex },
    { tag: t.macroName, color: palette.mauve.hex },
    { tag: t.literal, color: palette.peach.hex },
    { tag: t.string, color: palette.green.hex },
    { tag: t.docString, color: palette.green.hex },
    { tag: t.character, color: palette.teal.hex },
    { tag: t.attributeValue, color: palette.teal.hex },
    { tag: t.number, color: palette.peach.hex },
    { tag: t.integer, color: palette.peach.hex },
    { tag: t.float, color: palette.peach.hex },
    { tag: t.bool, color: palette.peach.hex },
    { tag: t.regexp, color: palette.pink.hex },
    { tag: t.escape, color: palette.pink.hex },
    { tag: t.color, color: palette.peach.hex },
    { tag: t.url, color: palette.blue.hex, textDecoration: 'underline' },
    { tag: t.keyword, color: palette.mauve.hex },
    { tag: t.self, color: palette.red.hex },
    { tag: t.null, color: palette.mauve.hex },
    { tag: t.atom, color: palette.mauve.hex },
    { tag: t.unit, color: palette.mauve.hex },
    { tag: t.modifier, color: palette.mauve.hex },
    { tag: t.operatorKeyword, color: palette.sky.hex },
    { tag: t.controlKeyword, color: palette.mauve.hex },
    { tag: t.definitionKeyword, color: palette.mauve.hex },
    { tag: t.moduleKeyword, color: palette.mauve.hex },
    { tag: t.operator, color: palette.sky.hex },
    { tag: t.derefOperator, color: palette.sky.hex },
    { tag: t.arithmeticOperator, color: palette.sky.hex },
    { tag: t.logicOperator, color: palette.sky.hex },
    { tag: t.bitwiseOperator, color: palette.sky.hex },
    { tag: t.compareOperator, color: palette.sky.hex },
    { tag: t.updateOperator, color: palette.sky.hex },
    { tag: t.definitionOperator, color: palette.sky.hex },
    { tag: t.typeOperator, color: palette.sky.hex },
    { tag: t.controlOperator, color: palette.sky.hex },
    { tag: t.punctuation, color: palette.overlay2.hex },
    { tag: t.separator, color: palette.overlay2.hex },
    { tag: t.bracket, color: palette.overlay2.hex },
    { tag: t.angleBracket, color: palette.overlay2.hex },
    { tag: t.squareBracket, color: palette.overlay2.hex },
    { tag: t.paren, color: palette.overlay2.hex },
    { tag: t.brace, color: palette.overlay2.hex },
    { tag: t.content, color: palette.text.hex },
    { tag: t.heading, color: palette.mauve.hex, fontWeight: 'bold' },
    { tag: t.heading1, color: palette.red.hex, fontWeight: 'bold' },
    { tag: t.heading2, color: palette.peach.hex, fontWeight: 'bold' },
    { tag: t.heading3, color: palette.yellow.hex, fontWeight: 'bold' },
    { tag: t.heading4, color: palette.green.hex, fontWeight: 'bold' },
    { tag: t.heading5, color: palette.blue.hex, fontWeight: 'bold' },
    { tag: t.heading6, color: palette.mauve.hex, fontWeight: 'bold' },
    { tag: t.contentSeparator, color: palette.teal.hex },
    { tag: t.list, color: palette.teal.hex },
    { tag: t.quote, color: palette.pink.hex, fontStyle: 'italic' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.link, color: palette.lavender.hex, textDecoration: 'underline' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    {
      tag: t.inserted,
      backgroundColor: new TinyColor(palette.green.hex).setAlpha(0.15).toHex8String(),
    },
    {
      tag: t.deleted,
      backgroundColor: new TinyColor(palette.red.hex).setAlpha(0.15).toHex8String(),
    },
    {
      tag: t.changed,
      backgroundColor: new TinyColor(palette.blue.hex).setAlpha(0.15).toHex8String(),
    },
    { tag: t.invalid, color: palette.red.hex },
    { tag: t.meta, color: palette.yellow.hex },
    { tag: t.documentMeta, color: palette.yellow.hex },
    { tag: t.annotation, color: palette.yellow.hex },
    { tag: t.processingInstruction, color: palette.yellow.hex },
    { tag: t.definition(t.name), color: palette.maroon.hex },
    { tag: t.definition(t.variableName), color: palette.maroon.hex },
    { tag: t.definition(t.propertyName), color: palette.lavender.hex },
    { tag: t.constant(t.name), color: palette.peach.hex },
    { tag: t.function(t.variableName), color: palette.blue.hex },
    { tag: t.function(t.propertyName), color: palette.blue.hex },
    { tag: t.function(t.punctuation), color: palette.sapphire.hex },
    { tag: t.standard(t.name), color: palette.mauve.hex },
    { tag: t.local(t.name), color: palette.maroon.hex },
    { tag: t.local(t.variableName), color: palette.maroon.hex },
    { tag: t.local(t.propertyName), color: palette.lavender.hex },
    { tag: t.special(t.string), color: palette.pink.hex },
    { tag: t.special(t.variableName), color: palette.pink.hex },
    { tag: t.special(t.propertyName), color: palette.pink.hex },
  ])
}

/// Extension to enable the Catppuccin theme (both the editor theme and
/// the highlight style).
export function catppuccin(variant: Variant): Extension {
  return [catppuccinTheme(variant), syntaxHighlighting(catppuccinHighlightStyle(variant))]
}

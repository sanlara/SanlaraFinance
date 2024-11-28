import { colors, typography, radius, shadows } from './theme';

export const button = {
  base: `
    inline-flex items-center justify-center
    px-4 py-2
    text-sm font-medium
    rounded-lg
    transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `,
  variants: {
    primary: `
      bg-[${colors.primary.DEFAULT}]
      hover:bg-[${colors.primary.hover}]
      text-white
      focus:ring-[${colors.primary.DEFAULT}]
    `,
    secondary: `
      bg-white
      hover:bg-gray-50
      text-gray-700
      border border-gray-200
      focus:ring-[${colors.primary.DEFAULT}]
    `,
    danger: `
      bg-red-600
      hover:bg-red-700
      text-white
      focus:ring-red-500
    `,
  },
};

export const tab = {
  base: `
    flex items-center gap-2
    w-full px-3 py-2
    text-sm rounded-lg
    transition-colors
  `,
  variants: {
    active: `
      bg-emerald-50
      text-emerald-600
    `,
    inactive: `
      text-gray-600
      hover:bg-gray-50
    `,
  },
};

export const card = {
  base: `
    bg-white
    rounded-2xl
    shadow-lg
    border border-gray-100
  `,
  header: `
    p-4
    border-b border-gray-100
  `,
  body: `
    p-6
  `,
};

export const input = {
  base: `
    block w-full
    px-3 py-2
    bg-gray-50
    border border-gray-200
    rounded-lg
    text-gray-900
    placeholder-gray-400
    focus:outline-none
    focus:border-emerald-500
    focus:ring-1
    focus:ring-emerald-500
    transition-colors
  `,
  label: `
    block
    text-sm
    font-medium
    text-gray-700
    mb-1
  `,
};

export const badge = {
  base: `
    inline-flex
    items-center
    px-2.5 py-1
    rounded-full
    text-xs
    font-medium
  `,
  variants: {
    success: `
      bg-emerald-50
      text-emerald-600
    `,
    error: `
      bg-rose-50
      text-rose-600
    `,
  },
};

export const table = {
  base: `
    w-full
    text-sm
    text-left
  `,
  header: `
    text-xs
    uppercase
    bg-gray-50
  `,
  headerCell: `
    px-6
    py-4
    font-medium
  `,
  row: `
    hover:bg-gray-50
    transition-colors
  `,
  cell: `
    px-6
    py-4
  `,
};
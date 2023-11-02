import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'gray-bg': 'rgb(240, 240, 242)',
        'moccasin': 'rgb(255,238,191)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
        boxShadow: {
          'for-search': '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, .3)',
          'for-menu': '0px 9px 13px gray;',
          'for-addInputCpnt': '0px 1px 5px 0px rgba(0, 0, 0, 0.5)',
          'for-note': '0px 1px 5px 0px rgba(0, 0, 0, 0.3)',
          'for-note-active': '0px 1px 13px 0px rgba(0, 0, 0, .4)'
        },
      borderWidth: {
        '1': '1px'
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.btn-primary': {
          borderRadius: '50%',
          '&:hover': {
            backgroundColor: 'rgb(223, 223, 223)',
            transitionProperty: 'background-color',
            transitionDuration: '0.4s',
          },
        },
        '.loader': {
          '--color': 'gray',
          '--size-mid': '4vmin',
          '--size-dot': '1.5vmin',
          '--size-bar': '0.4vmin',
          '--size-square': '3vmin',
          '&::before, &::after': {
            content: '""',
            boxSizing: 'border-box',
            position: 'absolute',
          },
          '&.--1::before': {
            width: 'var(--size-mid)',
            height: 'var(--size-mid)',
            border: '4px solid var(--color)',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'loader-1 1s linear infinite',
          },
          '&.--1::after': {
            width: 'calc(var(--size-mid) - 2px)',
            height: 'calc(var(--size-mid) - 2px)',
            border: '2px solid transparent',
            borderTopColor: 'var(--color)',
            borderRadius: '50%',
            animation: 'loader-1 0.6s linear reverse infinite',
          },
          '@keyframes loader-1': {
            '100%': {
              transform: 'rotate(1turn)',
            },
          },
        },
      });
    }),
  ],
  
}
export default config


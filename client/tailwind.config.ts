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
          'for-addInputCpnt': '0px 1px 5px 0px rgba(0, 0, 0, 0.5)'
        },
      borderWidth: {
        '1': '1px'
      },
    },
  },
  plugins: [
    plugin(({addComponents, theme}) => {
      addComponents({
        '.btn-primary': {
          borderRadius: ['50%'],
          '&:hover': {
            backgroundColor: 'rgb(223, 223, 223)',
            transitionProperty: 'background-color',
            transitionDuration: '0.4s',
          },
        },
      })
    })
  ],
}
export default config


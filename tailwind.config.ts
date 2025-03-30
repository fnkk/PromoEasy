import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        'tittle': '42px',
        'des': '14px',
      },
      fontWeight: {
        'tittle': '700',
        'des': '400',
      },
      width: {
        '1/24': '4.166666%', // 因为 1/24 约等于 4.166666%
        '23/24': '95.93%'
      },
      backgroundImage: {
        "explore-bg2": "url('/explore/bg2.svg')",
        "explore-search": "url('/explore/search.svg')",
        "aspect-bg1": "url('/aiagent/aspect/bg1.svg')",
        "aspect-bg2": "url('/aiagent/aspect/bg2.svg')",
        "aspect-bg3": "url('/aiagent/aspect/bg3.svg')",
        "achieve": "url('/aiagent/bg.svg')",
        "head-earn-4": "url('/header/4.png')",
        "head-earn-3": "url('/header/3.png')",
      },
      backgroundBlendMode: {
        'blend-overlay': 'overlay' // 使用overlay混合模式
      },
      colors: {
        'custom-gray': '#F1F1EF',
        'custom-gray-text': '#80808E',
        'custom-blue': '#0097A7',
        'glod-200': '#3a3622',
        'glod-150': 'rgba(58,54,34,0.5)',
        'glod-100': '#E1DAB1',
        'glod-50': '#7D5F0E',
        'custon-bg': '#02021E',
        'custon-bg-100': '#0f0f27',
        'custon-bg-200': '#1b1b32',
      },
    },
  },
  darkMode: "class",
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.before-overlay': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)', // 调整透明度
            pointerEvents: 'none',
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    nextui()
  ],
};
export default config;

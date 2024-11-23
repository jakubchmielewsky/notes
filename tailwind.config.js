/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: [
          "inter-italic",
          "inter",
          "noto-serif-italic",
          "noto-serif",
          "source-code-pro-italic",
          "source-code-pro"
        ],
      },

      colors: {
        customNeutral: {
          950: "#0E121B",
          900: "#191B25",
          800: "#232530",
          700: "#2B303B",
          600: "#525866",
          500: "#717784",
          400: "#99A0AE",
          300: "#CACFD8",
          200: "#E0E4EA",
          100: "#F3F5F8",
          50: "#F5F7FA",
          0: "#FFFFFF",
        },
        customBlue: {
          700: "#2547D0",
          500: "#335CFF",
          50: "#EBF1FF",
        },
        customGreen: {
          500: "#21C16B",
          100: "#D1FBE9",
        },
        customRed: {
          500: "#FB3748",
          100: "#FFD5D8",
        },
      },

      fontSize: {
        'preset-1': ['24px', { lineHeight: '120%', letterSpacing: '-0.5px' }],
        'preset-2': ['20px', { lineHeight: '120%', letterSpacing: '-0.5px' }],
        'preset-3': ['16px', { lineHeight: '120%', letterSpacing: '-0.3px' }],
        'preset-4': ['14px', { lineHeight: '120%', letterSpacing: '-0.2px' }],
        'preset-5': ['14px', { lineHeight: '120%', letterSpacing: '-0.2px' }],
        'preset-6': ['12px', { lineHeight: '120%', letterSpacing: '-0.2px' }],
      },

      spacing: {
        '0': '0px',
        '025': '2px',
        '050': '4px',
        '075': '6px',
        '100': '8px',
        '150': '12px',
        '200': '16px',
        '250': '20px',
        '300': '24px',
        '400': '32px',
        '500': '40px',
        '600': '48px',
        '800': '64px',
        '1000': '80px',
      },

      borderRadius: {
        '0': '0px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '10': '10px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        'full': '999px',
      },


    },
  },
  plugins: [],
}


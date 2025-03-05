// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Make sure this path includes your pages and components
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			indigo: {
  				'50': '#F0F5FF',
  				'100': '#D0D9FF',
  				'200': '#A0B8FF',
  				'300': '#708CFF',
  				'400': '#4068FF',
  				'500': '#3048E0',
  				'600': '#2538B2',
  				'700': '#1A2A84',
  				'800': '#122063',
  				'900': '#0A1552'
  			},
  			blue: {
  				'50': '#E0F2FF',
  				'100': '#A6D8FF',
  				'200': '#74BFFF',
  				'300': '#42A7FF',
  				'400': '#1A8FFF',
  				'500': '#0066CC',
  				'600': '#0059A2',
  				'700': '#004278',
  				'800': '#003058',
  				'900': '#002048'
  			},
  			teal: {
  				'50': '#E6FFFA',
  				'100': '#B2F4E9',
  				'200': '#80E9D7',
  				'300': '#4DE0C4',
  				'400': '#26C7A9',
  				'500': '#00AE8F',
  				'600': '#009C7A',
  				'700': '#00845E',
  				'800': '#006C42',
  				'900': '#00572F'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-modern': 'linear-gradient(to right, #6EE7B7, #3B82F6)'
  		},
  		boxShadow: {
  			xl: '0 4px 10px rgba(0, 0, 0, 0.1)',
  			'2xl': '0 10px 20px rgba(0, 0, 0, 0.15)'
  		},
  		spacing: {
  			'128': '32rem',
  			'144': '36rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      animation: {
        float: 'float 6s ease-in-out infinite',
        shake: 'shake 0.5s ease-in-out',
		bounce: 'bounce 1.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
		bounce: {
			'0%, 100%': {
			  transform: 'translateY(-25%)',
			},
			'50%': {
			  transform: 'translateY(0)',
			},
		},
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

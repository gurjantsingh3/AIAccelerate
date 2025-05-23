import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme"; // Import default theme

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { // Add container configuration
      center: true,
      padding: "1rem", // Default padding
       screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px", // Max container width
      },
    },
  	extend: {
      fontFamily: { // Define font families using variables
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
        // Add a stylish display font - Ensure you load this font in layout.tsx or via CSS import
        // Example using a variable, assuming you set it up:
        // display: ["var(--font-inter)", ...fontFamily.sans],
        // Or directly:
        // display: ["Inter", "sans-serif"], // Make sure 'Inter' is imported/available
      },
  		colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
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
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: { // Update border radius based on theme variable
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 4px)', // Adjusted calculation
  			sm: 'calc(var(--radius) - 6px)' // Adjusted calculation
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        "fadeIn": { // Updated fadeIn
          "0%": { opacity: '0', transform: 'translateY(15px) scale(0.98)' },
          "100%": { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        "pulse-glow": { // Added pulse-glow
           "0%, 100%": { boxShadow: "0 0 5px hsl(var(--accent) / 0.5), 0 0 10px hsl(var(--accent) / 0.3)" },
           "50%": { boxShadow: "0 0 10px hsl(var(--accent) / 0.7), 0 0 20px hsl(var(--accent) / 0.5)" },
         },
         // Add more animations if needed
         "slide-in-left": {
            "0%": { transform: "translateX(-100%)", opacity: '0'},
            "100%": { transform: "translateX(0)", opacity: '1'},
         },
         "slide-in-right": {
             "0%": { transform: "translateX(100%)", opacity: '0'},
             "100%": { transform: "translateX(0)", opacity: '1'},
          },

  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'fadeIn': 'fadeIn 0.6s ease-out forwards', // Adjusted duration
        'pulse-glow': 'pulse-glow 2.5s infinite ease-in-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

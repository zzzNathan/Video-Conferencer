const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
  		animation: {
  			aurora: 'aurora 60s linear infinite',
			"caret-blink": "caret-blink 1.25s ease-out infinite",
  		},
  		keyframes: {
  			aurora: {
  				from: {
  					backgroundPosition: '50% 50%, 50% 50%'
  				},
  				to: {
  					backgroundPosition: '350% 50%, 350% 50%'
  				}
  			},
		        "caret-blink": {
          			"0%,70%,100%": { opacity: "1" },
          			"20%,50%": { opacity: "0" },
        		},
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
          sec: "#B98DEE",
	  ter: "#FFC6E5",
	  black: "rgba(13,12,16,0.95)",
	  button: "#5c506a",
	  grad: "#423652",
      },
    }
  },
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({
  addBase,
  theme
}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}

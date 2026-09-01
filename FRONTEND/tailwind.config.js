/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "#ebeef1",
        "on-error-container": "#ffdad6",
        "inverse-primary": "#0060a8",
        "surface-container-high": "#232a36",
        "primary-fixed": "#d3e4ff",
        "on-surface-variant": "#c1c7d3",
        "inverse-surface": "#dce2f2",
        "surface-bright": "#333946",
        "on-secondary": "#680014",
        "on-primary-container": "#e6efff",
        "surface-dim": "#0d141e",
        "secondary-fixed-dim": "#ffb3b2",
        "on-primary-fixed-variant": "#004881",
        "surface-container-low": "#151c27",
        "on-secondary-container": "#ffe1e0",
        "tertiary-container": "#686c6f",
        "tertiary": "#c3c7ca",
        "surface-variant": "#2e3541",
        "on-surface": "#dce2f2",
        "on-secondary-fixed": "#410008",
        "tertiary-fixed-dim": "#c3c7ca",
        "surface": "#0d141e",
        "primary-fixed-dim": "#a2c9ff",
        "on-tertiary-fixed": "#181c1e",
        "tertiary-fixed": "#e0e3e6",
        "error": "#ffb4ab",
        "error-container": "#93000a",
        "on-tertiary": "#2d3133",
        "inverse-on-surface": "#2a313d",
        "surface-container-highest": "#2e3541",
        "on-error": "#690005",
        "surface-tint": "#a2c9ff",
        "surface-container-lowest": "#070e19",
        "primary-container": "#0d6ebd",
        "outline": "#8b919d",
        "primary": "#a2c9ff",
        "on-primary-fixed": "#001c38",
        "on-secondary-fixed-variant": "#920020",
        "secondary-container": "#d10332",
        "surface-container": "#19202b",
        "secondary": "#ffb3b2",
        "background": "#0d141e",
        "on-tertiary-fixed-variant": "#43474a",
        "outline-variant": "#414751",
        "secondary-fixed": "#ffdad9",
        "on-primary": "#00315b",
        "on-background": "#dce2f2"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "sm": "8px",
        "gutter": "20px",
        "lg": "24px",
        "xs": "4px",
        "unit": "4px",
        "xl": "40px",
        "md": "16px",
        "margin-safe": "32px"
      },
      fontFamily: {
        "body-sm": ["Inter"],
        "h2-section": ["Inter"],
        "label-caps": ["Inter"],
        "label-md": ["Inter"],
        "h1-display": ["Inter"],
        "body-main": ["Inter"]
      },
      fontSize: {
        "body-sm": ["14px", { "lineHeight": "1.5", "fontWeight": "400" }],
        "h2-section": ["22px", { "lineHeight": "1.4", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "label-caps": ["11px", { "lineHeight": "1", "letterSpacing": "0.08em", "fontWeight": "600" }],
        "label-md": ["12px", { "lineHeight": "1", "fontWeight": "500" }],
        "h1-display": ["32px", { "lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-main": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }]
      }
    }
  },
  plugins: [],
}

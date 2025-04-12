/** @type {import('tailwindcss').Config} */

/*
export default {
    content: ["./index.html", "./src/**/*.js", "./src/**/*.html", "./src/**/*.css"], // Make sure it covers all files
    safelist: [
      "bg-grid-dot" 
    ],
    theme: {
      extend: {
        backgroundImage: {
          "grid-dot": "radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)", 
        },
      },
    },
    plugins: [],
  };
  */

module.exports = {
    content: ["./index.html", "./src/**/*.{html,js}"], // Scan these files
    theme: {
        extend: {
            backgroundImage: {
              'grid-dot': "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
            },
            spacing: {
              'canvas-width': '600px',
              'canvas-height': '400px',
            },
          }
        },
        plugins: [],
  };
  

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkBack: '#000517',
        liteBack: '#1E293B',
        
        customYellow: '#f59e0b',
        customYellow2: "#FFA600",
        customLiteBlue: '#54afff',
        customDarkBlue: '#428eff',
        
        customCardRed: "#f56042",
        customCardGreen: "#3ef757",
        customCardBlue: "#3e82f7",
        customCardViolet: "#3e57f7",
        customCardYellow: "#f7db3e",
        customCardOrange: "#f7973e",

        logoutLite: "#ce284c",
        logoutDark: "#a72843",


      }
    },
  },
  plugins: [],
}
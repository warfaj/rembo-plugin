const { colors } = require('@mui/material');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./ui-src/index.html", "./ui-src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				hero: "url('./sample.svg')",
			},
			fontFamily: {
				sans: ["VelaSans"],
			},
			colors: {
				empty: "#F8FDFF",
				outline: "#0D3A4E",
				primary: "#2FB8E3",
			},
		},
	},
	plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    	"index.html",
    	"./src/**/*.{html,js}"
    ],
    theme: {
        extend: {
        	fontFamily: {
        		"electro": ['Electrolize', 'sans-serif']
        	}
        }
    },
    plugins: []
};

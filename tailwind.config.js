module.exports = {
    //remove html?
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'textC': {        //cool toned gray
          100: '#c2d3e8', //main
          200: '#9badc6', 
          300: '#64748b', //clicked?
        },
        'buttonC': {      //teal
          100: '#80ccc9', //hover
          200: '#44aaa7', 
          300: '#067c7a', //clicked
        }, 
        'backgroundC' : { //navy
          100: '#548da8', 
          200: '#275c75',
          300: '#203549',
          400: '#03223f', 
        },
        'accentC': {      //lilac
          100: '#856fa8', // ?? not sure yet 
        }  
      },
      fontFamily: {
        logo: ['Hubballi', 'sans-serif']
      },
    }  
  },
  plugins: [],
};

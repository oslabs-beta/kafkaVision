module.exports = {
    //remove html?
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        limeGreen: '#d2fdbb',
        seafoam: '#03dac5',
        fontGray: '#D9E2EC',
        lightGray: '#455a6d',
        slateBlue: '#22404c',
        darkIndigo: '#1d3051',
        darkBlue: '#152D49'

        // 'textC': {        //lilac toned gray
        //   100: '#D9E2EC', 
        //   // 200: '#9badc6', 
        //   // 300: '#64748b', 
        // },
        // 'buttonC': {      //teal
        //   100: '#80ccc9', //hover
        //   200: '#44aaa7', 
        //   300: '#067c7a', //clicked
        // }, 
        // 'backgroundC' : { //navy
        //   100: '#548da8', 
        //   200: '#275c75',
        //   300: '#203549',
        //   400: '#03223f', 
        // },
        // 'accentC': {      //lilac
        //   100: '#856fa8', // ?? not sure yet 
        // }  
      },
      fontFamily: {
        logo: ['Hubballi', 'sans-serif']
      },
    }  
  },
  plugins: [],
};


/*
limeGreen: '#d2fdbb',
seafoam: '#03dac5',

fontGray: '#D9E2EC',
lightGray: '#455a6d',
slateBlue: '#22404c'
darkIndigo: '#1d3051',
darkBlue: '#152D49'

// default background
 gray-50
*/
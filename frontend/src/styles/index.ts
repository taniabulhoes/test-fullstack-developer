import {createStitches} from '@stitches/react'

export const {
  config,
  styled,
  globalCss,
  keyframes,
  getCssText,
  css,
  createTheme,
  theme
} = createStitches({
  media: {
    bp1: '(min-width: 340px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },

  theme: {
    colors: {
      header: '#f4f4f4',
      body: '#fff',
      containerlogin: '#262626',
      todocard: '#262626',
      texttodo: '#fff',
      detail: '#00a873',
      inputs: '#121214'
    },  
    
    fontSizes: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2.5rem',
    },

    radii: {
      md: '0.2rem'
    }    
  }  
})


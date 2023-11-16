import { createTheme } from "@stitches/react";

export const darkTheme = createTheme({
  colors: {
    header: '#0D0D0D',
    body: '#1A1A1A',
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
});
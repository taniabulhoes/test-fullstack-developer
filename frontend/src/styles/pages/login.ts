import { styled } from "..";

export const Container = styled('main', {
  display: 'grid',
 '@bp1': {gridTemplateColumns: '1fr', marginTop: '70vh'},
 '@bp2': {gridTemplateColumns: '1fr', height: '70vh'},  
 '@bp3': {gridTemplateColumns: '1fr 1fr', height: '100vh'},
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  width: '100%',
  maxWidth: '70%',
})

export const Advertising = styled('div', {
  'p': {
    width: '90%',
    color: '$texttodo',
    fontSize: '$2xl',
    fontWeight: 900,
    'span': {
      color: '$detail'
    }
  }
})

export const LoginContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$containerlogin',
  borderRadius: '$md',
  '@bp1': {padding: '2rem'},
  '@bp2': {padding: '2rem'},  
  '@bp3': {padding: '4rem'},
})

export const ForgotPassowrd = styled('span', {
  width: '100%',
  marginBottom: '1rem',

  'a': {
    color: '$detail',
    textDecoration: 'none'    
  }
})

export const CreateAccount = styled('div', {
  width: '100%',
  marginTop: '1rem',
  color: '$texttodo',
  'span': {
    color: '$detail'
  },

  'a': {
    color: '$detail',
    textDecoration: 'none',
    fontWeight: 900   
  }
})
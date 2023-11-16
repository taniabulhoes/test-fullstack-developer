import { styled } from "..";

export const ContainerRegister = styled('div',{
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',

  'p': {
    width: '90%',
    marginTop: '2rem',
    color: '$texttodo',
    textAlign: 'center',
    fontSize: '$xl',
    fontWeight: 700,
    'span': {
      color: '$detail'
    },
  }  
})

export const Form = styled('div', {
  width: '70%',
  height: '90vh',
  borderRadius: '$md',
  background: '$containerlogin',
  margin: '2rem 0'
})
import { styled } from ".."

export const Input = styled('input', {
  height: '45px',
  border: 'none',
  outline: 'none',
  background: '$inputs',
  borderRadius: '$md',  
  color: '$texttodo',
  margin: '0.5rem 0',
  paddingLeft: '1rem',

  ':placeholder': {
    color: '$texttodo'
  }
})

export const Button = styled('button', {
  width: '100%',
  height: '45px',
  marginTop: '1rem',
  border: 'none',
  background: '$detail',
  borderRadius: '$md',
  color: '$texttodo',
  fontWeight: 900
})
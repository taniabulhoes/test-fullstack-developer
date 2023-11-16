import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  background: 'orange',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  width: '100%',
  maxWidth: 800,
  padding: '0.5rem'
})

export const Todo = styled('div', {
  borderCollapse: 'collapse',
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: 6,
  background: 'red'
})

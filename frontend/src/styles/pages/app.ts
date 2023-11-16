import { styled } from "..";

export const Container = styled('div', {
  display: 'flex',
  background: '$body',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  height: '8vh',
  background: '$header',
  width: '100%',
  margin: '0 auto',
  marginBottom: '2.5rem'
})
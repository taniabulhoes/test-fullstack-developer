import { styled } from "..";

export const TodoCard = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  borderCollapse: 'collapse',
  width: '100%',
  padding: '0.8rem 1rem',
  borderRadius: 6,
  background: '$todocard',
  margin: '0.2rem',

  'div': {
    display: 'flex',
    justifyContent: 'space-between',
    color: '$texttodo',

  }
})

import {render, screen} from '@testing-library/react'
import { EmptyTodos } from './EmptyTodos'

describe('Suite EmptyList Test', () => {
  it('should have a frase', () => {
    render(<EmptyTodos />) 
  
    const myElement = screen.getByText('Você ainda não cadastrou nenhuma ToDo. Deseja adicionar?')
  
    expect(myElement).toBeInTheDocument()
  })
})


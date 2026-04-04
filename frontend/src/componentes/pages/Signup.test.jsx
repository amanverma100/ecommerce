import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

vi.mock('axios')

vi.mock('react-toastify', () => ({
  toast: { error: vi.fn(), success: vi.fn() }
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => vi.fn() }
})

import Signup from './Signup'

const renderSignup = () => render(
  <MemoryRouter>
    <Signup />
  </MemoryRouter>
)

describe('Signup page', () => {

  it('renders without crashing', () => {
    const { container } = renderSignup()
    expect(container).toBeTruthy()
  })

  it('shows name input', () => {
    renderSignup()
    expect(screen.getByPlaceholderText('Enter Name')).toBeTruthy()
  })

  it('shows email input', () => {
    renderSignup()
    expect(screen.getByPlaceholderText('Enter Gmail')).toBeTruthy()
  })

  it('shows password inputs', () => {
    renderSignup()
    const passwordInputs = screen.getAllByPlaceholderText('Enter Password')
    expect(passwordInputs.length).toBe(2)
  })

  it('shows signup button', () => {
    renderSignup()
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('can type in name field', () => {
    renderSignup()
    const input = screen.getByPlaceholderText('Enter Name')
    fireEvent.change(input, { target: { value: 'John' } })
    expect(input.value).toBe('John')
  })

  it('can type in email field', () => {
    renderSignup()
    const input = screen.getByPlaceholderText('Enter Gmail')
    fireEvent.change(input, { target: { value: 'test@gmail.com' } })
    expect(input.value).toBe('test@gmail.com')
  })

})
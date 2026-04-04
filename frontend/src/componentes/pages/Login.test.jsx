import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import store from '../../store'
import verifyContext from '../context/createcontext'

vi.mock('axios')

vi.mock('react-toastify', () => ({
  toast: { error: vi.fn(), success: vi.fn() }
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return { ...actual, useNavigate: () => vi.fn() }
})

import Login from './Login'

const renderLogin = () => render(
  <Provider store={store}>
    <MemoryRouter>
      <verifyContext.Provider value={{ veriUser: vi.fn() }}>
        <Login />
      </verifyContext.Provider>
    </MemoryRouter>
  </Provider>
)

describe('Login page', () => {

  it('renders without crashing', () => {
    const { container } = renderLogin()
    expect(container).toBeTruthy()
  })

  it('shows email input', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('Enter Gmail')).toBeTruthy()
  })

  it('shows password input', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('Enter Password')).toBeTruthy()
  })

  it('shows login button', () => {
    renderLogin()
    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('can type in email field', () => {
    renderLogin()
    const input = screen.getByPlaceholderText('Enter Gmail')
    fireEvent.change(input, { target: { value: 'test@gmail.com' } })
    expect(input.value).toBe('test@gmail.com')
  })

  it('can type in password field', () => {
    renderLogin()
    const input = screen.getByPlaceholderText('Enter Password')
    fireEvent.change(input, { target: { value: '123456' } })
    expect(input.value).toBe('123456')
  })

})
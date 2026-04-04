import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './store'

// Mock axios to prevent real API calls during test
vi.mock('axios')

// Mock toast to prevent errors
vi.mock('react-toastify', () => ({
  toast: { error: vi.fn(), success: vi.fn() },
  ToastContainer: () => null
}))

// Mock the context
vi.mock('./componentes/context/createcontext', () => ({
  default: { Provider: ({ children }) => children }
}))

// Mock Header and Footer to avoid their own dependencies crashing
vi.mock('./componentes/Header', () => ({ default: () => <div>Header</div> }))
vi.mock('./componentes/Footer', () => ({ default: () => <div>Footer</div> }))

import App from './App'

describe('App component', () => {

  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(container).toBeTruthy()
  })

  it('renders Header', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(getByText('Header')).toBeTruthy()
  })

  it('renders Footer', () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )
    expect(getByText('Footer')).toBeTruthy()
  })

})
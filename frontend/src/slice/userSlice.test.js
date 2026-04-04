import { describe, it, expect } from 'vitest'
import userReducer, { setUserDetail } from './userSlice'

describe('userSlice', () => {

  it('should return initial state', () => {
    const state = userReducer(undefined, { type: 'unknown' })
    expect(state).toBeTruthy()
  })

  it('should set user detail', () => {
    const user = { name: 'John', email: 'john@test.com', role: 'user' }
    const state = userReducer(undefined, setUserDetail(user))
    expect(state.user).toEqual(user)
  })

  it('should update user when called again', () => {
    const user1 = { name: 'John' }
    const user2 = { name: 'Jane' }
    let state = userReducer(undefined, setUserDetail(user1))
    state = userReducer(state, setUserDetail(user2))
    expect(state.user.name).toBe('Jane')
  })

})
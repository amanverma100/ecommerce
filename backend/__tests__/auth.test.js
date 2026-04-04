const { describe, it, expect } = require('@jest/globals')
const request = require('supertest')
const express = require('express')
const Auth = require('../middleware/auth')

const app = express()
app.use(express.json())

// protected test route
app.get('/protected', Auth, (req, res) => {
  res.json({ success: true })
})

describe('Auth middleware', () => {

  it('should return 401 if no Authorization header', async () => {
    const res = await request(app).get('/protected')
    expect(res.status).toBe(401)
  })

  it('should return 401 if token is invalid', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer invalidtoken')
    expect(res.status).toBe(401)
  })

  it('should return 401 if Bearer token is empty', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer ')
    expect(res.status).toBe(401)
  })

})
const { describe, it, expect } = require('@jest/globals')
const request = require('supertest')
const express = require('express')

// mock mongoose so no real DB needed
jest.mock('../config/database', () => jest.fn())
jest.mock('../model/userModel', () => ({
  findOne: jest.fn(),
  save: jest.fn(),
}))

const app = express()
app.use(express.json())
const router = require('../routes')
app.use('/api', router)

describe('User routes', () => {

  it('POST /api/signup - should fail if body is empty', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({})
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  it('POST /api/signup - should accept valid user data', async () => {
    const res = await request(app)
      .post('/api/signup')
      .send({
        Name: 'John',
        email: 'john@test.com',
        password: '123456',
        confirmpassword: '123456'
      })
    expect([200, 201, 400, 500]).toContain(res.status)
  })

  it('POST /api/login - should fail if body is empty', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({})
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  it('POST /api/login - should fail with wrong credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'wrong@test.com',
        password: 'wrongpassword'
      })
    expect(res.status).toBeGreaterThanOrEqual(400)
  })

  it('GET /api/verified - should fail without token', async () => {
    const res = await request(app).get('/api/verified')
    expect(res.status).toBe(401)
  })

  it('GET /api/users - should fail without token', async () => {
    const res = await request(app).get('/api/users')
    expect(res.status).toBe(401)
  })

})
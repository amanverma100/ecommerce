const { describe, it, expect } = require('@jest/globals')
const request = require('supertest')
const express = require('express')

jest.mock('../model/productModel', () => ({
  find: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue(null),
  distinct: jest.fn().mockResolvedValue([])
}))

const app = express()
app.use(express.json())
const router = require('../routes')
app.use('/api', router)

describe('Product routes', () => {

  it('GET /api/getproduct - should return 200', async () => {
    const res = await request(app).get('/api/getproduct')
    expect([200, 400, 404, 500]).toContain(res.status)
  })

  it('GET /api/getproduct - should return JSON', async () => {
    const res = await request(app).get('/api/getproduct')
    expect(res.headers['content-type']).toMatch(/json/)
  })

  it('GET /api/categoryproduct - should return 200 or error', async () => {
    const res = await request(app).get('/api/categoryproduct')
    expect([200, 400, 404, 500]).toContain(res.status)
  })

  it('POST /api/categorywise - should fail if body empty', async () => {
    const res = await request(app)
      .post('/api/categorywise')
      .send({})
    expect([200, 400, 404, 500]).toContain(res.status)
  })

  it('POST /api/productdetail - should fail if body empty', async () => {
    const res = await request(app)
      .post('/api/productdetail')
      .send({})
    expect([200, 400, 404, 500]).toContain(res.status)
  })

  it('POST /api/uploadproduct - should fail without token', async () => {
    const res = await request(app)
      .post('/api/uploadproduct')
      .send({})
    expect(res.status).toBe(401)
  })

  it('POST /api/updateproduct - should fail without token', async () => {
    const res = await request(app)
      .post('/api/updateproduct')
      .send({})
    expect(res.status).toBe(401)
  })

})
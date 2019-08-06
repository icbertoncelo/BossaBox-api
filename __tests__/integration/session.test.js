import request from 'supertest';
import app from '../../src/app';

import truncate from '../utils/truncate';
import factory from '../factories';

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(200);
  });

  it('Should not be able to authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'password',
      });

    expect(response.status).toBe(401);
  });

  it('Should return jwt when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('Should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${user.generateToken(user)}`);

    expect(response.status).toBe(200);
  });

  it('Should not be able to access private routes without jwt token', async () => {
    const response = await request(app).get('/tools');

    expect(response.status).toBe(401);
  });

  it('Should not be able to access private routes when not authenticated', async () => {
    const response = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer invalid1234token5678`);

    expect(response.status).toBe(401);
  });
});

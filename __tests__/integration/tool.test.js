import request from 'supertest';
import app from '../../src/app';

import truncate from '../utils/truncate';
import factory from '../factories';

describe('Tools', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to register a new tool', async () => {
    const user = await factory.create('User');
    const tool = await factory.attrs('Tool');

    const response = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${user.generateToken(user)}`)
      .send(tool);

    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to list all tools', async () => {
    const user = await factory.create('User');
    const tool = await factory.attrs('Tool');

    await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${user.generateToken(user)}`)
      .send(tool);

    const response = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${user.generateToken(user)}`);

    expect(response.body.length).toBe(1);
    expect(response.status).toBe(200);
  });

  it('Should be able to remove a tool', async () => {
    const user = await factory.create('User');
    const tool = await factory.attrs('Tool');

    const newTool = await request(app)
      .post('/tools')
      .set('Authorization', `Bearer ${user.generateToken(user)}`)
      .send(tool);

    const response = await request(app)
      .delete(`/tools/${newTool.body.id}`)
      .set('Authorization', `Bearer ${user.generateToken(user)}`);

    expect(response.statusCode).toBe(204);
  });
});

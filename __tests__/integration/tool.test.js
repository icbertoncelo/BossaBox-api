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
});

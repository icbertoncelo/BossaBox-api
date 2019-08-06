import faker from 'faker';
import { factory } from 'factory-girl';
import User from '../src/app/models/User';
import Tool from '../src/app/models/Tool';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Tool', Tool, {
  title: faker.lorem.words(),
  link: faker.internet.domainName(),
  description: faker.lorem.sentence(),
  tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
});

export default factory;

import faker from 'faker';

export default function makeFakeUser(overides) {
  const user = {
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.lorem.words(3),
    isAdmin: false,
  };
  return { user, ...overides };
}

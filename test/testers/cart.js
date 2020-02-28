import faker from 'faker';

export default function makeFakeCart(overides) {
  const cart = {
    userId: faker.random.number(10),
  };
  return { cart, ...overides };
}

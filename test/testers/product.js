import faker from 'faker';

export default function makeFakeProduct(overides) {
  const product = {
    name: faker.lorem.words(2),
    description: faker.lorem.sentences(),
    category: 'book',
    price: parseFloat(3000.0),
    imageUrl: 'http://test-image.jpg',
    inStock: true,
  };
  return { product, ...overides };
}

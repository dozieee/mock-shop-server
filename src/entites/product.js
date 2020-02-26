export default function makeProduct({
  id,
  name,
  description,
  category,
  price,
  imageUrl = '', // if no imagesUrl is passed set the default value
  inStock = true,
} = {}) {
  if (!name) {
    throw new Error('product must have a name');
  }
  if (!description) {
    throw new Error('product must have a description');
  }
  if (description.split(' ').length < 3) {
    throw new Error('product description must have a least 3 words');
  }
  if (!category) {
    throw new Error('product must have a category');
  }
  if (!price) {
    throw new Error('product must have a price');
  }
  if (price <= 0) {
    throw new Error('product price mus be grater than 0');
  }

  // the getters and setters
  return Object.freeze({
    getId: () => id,
    getName: () => name,
    getDescription: () => description,
    getCategory: () => category,
    getPrice: () => price,
    getImageUrl: () => imageUrl,
    stillInSock: () => inStock,
  });
}

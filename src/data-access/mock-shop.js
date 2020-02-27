export default function buildMakeMocShopkDb({ Model }) {
  return function makeMockShopDb({ modelName }) {
    const sellectedModel = Model[modelName];
    return Object.freeze({
      find, // fetch data based on given querys
      findAll, // fetch all data
      findById, // fetch data by the unque id field
      findByEmail, // fetch user data by the email field
      findByPrice, // fetch product data by the price ==> implement a price range fetch
      findByCategory, // fetch product by the category field
      findByUserId, // fetch the cart data by the userId field
      findByProductId, // fetch cart data by the productId field
      findByName, // fetch product data by the name feild
      update, //update the data
      insert, //insert data to the db
      remove, // remove data from the db
    });
    // find
    function find(query) {
      return sellectedModel.findAll({ where: query });
    }
    // finAll
    function findAll() {
      return sellectedModel.findAll();
    }
    // findById
    function findById(id) {
      return sellectedModel.findOne({ where: { id } });
    }
    // findByEamil
    function findByEmail(email) {
      return sellectedModel.findOne({ where: { email } });
    }
    // findByPrice
    function findByPrice(price, condetion) {}
    // findByCategory
    function findByCategory(category) {
      return sellectedModel.findAll({ where: { category } });
    }
    // findByUserId
    function findByUserId(userId) {
      return sellectedModel.findOne({ where: { userId } });
    }
    // findByProductId
    function findByProductId(productId) {
      return sellectedModel.findAll({ where: { productId } });
    }
    function findByName(name) {
      return sellectedModel.findOne({ where: { name } });
    }
    // insert
    function insert(data) {
      return sellectedModel
        .create(data)
        .then((newDate) => newDate.get({ plain: true }));
    }
    // update
    function update({ id, ...rest }) {
      return sellectedModel.update({ ...rest }, { where: { id } });
    }
    // remove
    function remove(id) {
      return sellectedModel.destroy({ where: { id } });
    }
  };
}

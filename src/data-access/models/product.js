export default (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING,
    inStock: DataTypes.BOOLEAN,
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};

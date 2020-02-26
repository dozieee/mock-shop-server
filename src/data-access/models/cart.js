export default (sequelize, DataTypes) => {
  const Cart = sequelize.define('cart', {
    productIds: DataTypes.ARRAY(DataTypes.INTEGER),
    userId: DataTypes.INTEGER,
  });
  Cart.associate = function(models) {
    // associations is defined here
    Cart.belongsTo(models.user, {
      foreignKey: 'id',
    });
    Cart.has
  };
  return Cart;
};

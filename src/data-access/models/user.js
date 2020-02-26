export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

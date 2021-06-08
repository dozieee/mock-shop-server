export default (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING,
    paid: DataTypes.BOOLEAN,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    venue: DataTypes.STRING,
    ticket_type: DataTypes.ARRAY(DataTypes.JSONB),
    private: DataTypes.BOOLEAN
  });
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};
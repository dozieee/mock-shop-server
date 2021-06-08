export default (sequelize, DataTypes) => {
  const EventAttendance = sequelize.define('EventAttendance', {
    eventId: DataTypes.ARRAY(DataTypes.INTEGER),
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: DataTypes.STRING,
    number_of_tiket: DataTypes.STRING,
    ticket_type: DataTypes.JSONB
  });
  EventAttendance.associate = function(models) {
    // associations is defined here
    EventAttendance.belongsTo(models.Event, {
      foreignKey: 'id',
    });
    EventAttendance.has
  };
  return EventAttendance;
};

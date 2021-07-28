module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: DataTypes.DOUBLE,
    shipping_address: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.ENUM('progress', 'done', 'reject')
  })
  return Order
}

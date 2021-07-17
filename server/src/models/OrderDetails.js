module.exports = (sequelize, DataTypes) => {
  const OrderDetails = sequelize.define('OrderDetails', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER
  })
  return OrderDetails
}

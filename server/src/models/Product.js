module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.INTEGER,
    available: DataTypes.BOOLEAN,
    img: DataTypes.TEXT,
    url: DataTypes.STRING,
    detail: DataTypes.TEXT
  })
  return Product
}

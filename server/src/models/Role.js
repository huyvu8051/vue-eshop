module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING
  })

  return Role
}

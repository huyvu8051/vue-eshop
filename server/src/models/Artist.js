module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING
  })
  return Artist
}

module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: DataTypes.STRING
  })

  return Song
}

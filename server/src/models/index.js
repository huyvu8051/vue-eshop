const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')

const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

fs
    .readdirSync(__dirname)
    .filter((file) => 
        file !== 'index.js'
        )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Song = require('./Song') (sequelize, Sequelize)
db.Artist = require('./Artist') (sequelize, Sequelize)
db.Product = require('./Product') (sequelize, Sequelize)
db.Category = require('./Category') (sequelize, Sequelize)

db.Artist.hasMany(db.Song)
db.Song.belongsTo(db.Artist)

db.Category.hasMany(db.Product)
db.Product.belongsTo(db.Category)

console.log('dir: ', __dirname)
module.exports = db
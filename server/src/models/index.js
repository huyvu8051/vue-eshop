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

db.Product = require('./Product') (sequelize, Sequelize)
db.Category = require('./Category') (sequelize, Sequelize)
db.Role = require('./Role') (sequelize, Sequelize)

db.Category.hasMany(db.Product)
db.Product.belongsTo(db.Category)

db.User.belongsToMany(db.Role, {
    through: "User_Role"
})
db.Role.belongsToMany(db.User, {
    through: "User_Role"
})


console.log('dir: ', __dirname)
module.exports = db
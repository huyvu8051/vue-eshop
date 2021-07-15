const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')

const InitDB = require('./InitDB')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require ('./routers') (app)

sequelize.sync({force: true})
    .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
}).then(InitDB)

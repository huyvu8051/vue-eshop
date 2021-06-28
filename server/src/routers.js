const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const ArtistController = require('./controllers/ArtistController')
const ProductController = require('./controllers/ProductController')
const CategoryController = require('./controllers/CategoryController')

module.exports = (app) => {
    app.post('/register',
    AuthenticationControllerPolicy.register,
     AuthenticationController.register)
    app.post('/login',
     AuthenticationController.login)

    // song router

    app.get('/song',
     SongsController.findAll)
    app.post('/song',
     SongsController.create)

    // artist router

    app.get('/artist',
     ArtistController.findAll)
    app.post('/artist',
    ArtistController.create)

    // product router

    app.get('/product',
    ProductController.findAll)
    app.post('/product',
    ProductController.create)
    app.put('/product',
    ProductController.update)
    app.delete('/product',
    ProductController.delete)

    // category router

    app.get('/category',
    CategoryController.findAll)
    app.post('/category',
    CategoryController.create)
}


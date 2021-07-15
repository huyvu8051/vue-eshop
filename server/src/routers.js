const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const ProductController = require('./controllers/ProductController')
const CategoryController = require('./controllers/CategoryController')
const AuthorizationController = require('./controllers/AuthorizationController')

module.exports = (app) => {
    app.post('/register',
    AuthenticationControllerPolicy.register,
     AuthenticationController.register)
    app.post('/login',
     AuthenticationController.login)
     
    // guest

    app.get('/product',
    ProductController.findAll)
    
    app.post('/product',
    ProductController.create)
    app.put('/product',
    ProductController.update)
    app.delete('/product',
    ProductController.delete)

    // admin

    app.get('/admin/product',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    ProductController.findAll)
    
    app.post('/admin/product',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    ProductController.create)

    app.put('/admin/product',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    ProductController.update)

    app.delete('/admin/product',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    ProductController.delete)

    // category router

    app.get('/admin/category',
    CategoryController.findAll)
    app.post('/admin/category',
    CategoryController.create)
}


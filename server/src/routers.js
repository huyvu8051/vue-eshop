const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AdminProductController = require('./controllers/AdminProductController')
const ProductController = require('./controllers/ProductController')
const CategoryController = require('./controllers/AdminCategoryController')
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
    
    app.post('/productDetails',
    ProductController.findOneById)

    app.post('/cart',
    ProductController.findAllByArrayId)


    // admin

    app.get('/admin/product',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    AdminProductController.findAll)
    
    app.post('/admin/product',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    AdminProductController.create)

    app.put('/admin/product',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    AdminProductController.update)

    app.delete('/admin/product',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    AdminProductController.delete)

    // category router

    app.get('/admin/category',
    CategoryController.findAll)
    app.post('/admin/category',
    CategoryController.create)
}


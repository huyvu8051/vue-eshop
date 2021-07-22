const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AdminProductController = require('./controllers/AdminProductController')
const ProductController = require('./controllers/ProductController')
const CategoryController = require('./controllers/AdminCategoryController')
const AuthorizationController = require('./controllers/AuthorizationController')

const UserOrderController = require('./controllers/user/OrderController')
const AdminOrderController = require('./controllers/admin/OrderController')
const AdminUserController = require('./controllers/admin/UserController')
const UserOrderDetailsController = require('./controllers/user/OrderDetailsController')

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

    app.get('/admin/category',
    CategoryController.findAll)

    app.post('/admin/category',
    CategoryController.create)

    app.get('/admin/order',
    AdminOrderController.findAll)

    app.get('/admin/user',
    AdminUserController.findAll)

    app.get('/user/order',
    AuthorizationController.verifyToken,
    UserOrderController.findAll)

    app.post('/user/order',
    AuthorizationController.verifyToken,
    UserOrderController.create)

    app.get('/user/orderDetails',
    AuthorizationController.verifyToken,
    UserOrderDetailsController.findOneById)
}


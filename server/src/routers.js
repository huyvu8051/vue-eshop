const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const AdminProductController = require('./controllers/AdminProductController')
const ProductController = require('./controllers/ProductController')
const CategoryController = require('./controllers/AdminCategoryController')
const AuthorizationController = require('./controllers/AuthorizationController')

const UploadFileController = require('./controllers/UploadFileController')

const UserOrderController = require('./controllers/user/OrderController')
const UserProductController = require('./controllers/user/ProductController')
const AdminOrderController = require('./controllers/admin/OrderController')
const AdminUserController = require('./controllers/admin/UserController')
const UserOrderDetailsController = require('./controllers/user/OrderDetailsController')

const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/assets') //Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage })

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
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    CategoryController.findAll)

    app.post('/admin/category',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    CategoryController.create)

    app.get('/admin/order',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    AdminOrderController.findAll)

    app.put('/admin/order',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    AdminOrderController.updateStatus)

    app.get('/admin/user',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    AdminUserController.findAll)

    // user

    app.get('/user/product',
    UserProductController.findAll)

    app.get('/user/order',
    AuthorizationController.verifyToken,
    UserOrderController.findAll)

    app.post('/user/order',
    AuthorizationController.verifyToken,
    UserOrderController.create)

    app.get('/user/orderDetails',
    AuthorizationController.verifyToken,
    UserOrderDetailsController.findOneById)

    app.post('/upload',
    AuthorizationController.verifyToken,
    AuthorizationController.isAdmin,
    upload.single('file'),
    UploadFileController.saveFile)
    
}


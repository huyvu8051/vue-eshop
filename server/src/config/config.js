module.exports = {
    port: 8081,
    db: {
        databse: process.env.DB_NAME || 'eshop',
        user: process.env.DB_USER || 'eshop',
        password: process.env.DB_PASS || 'eshop',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './eshop.sqlite'
        }
        
    },
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
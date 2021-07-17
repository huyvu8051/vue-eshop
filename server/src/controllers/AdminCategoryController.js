const {Product, Category} = require('../models')

module.exports = {
  async findAll (req, res) {
    try {
      const categories = await Category.findAll()
      res.send(categories)
    } catch (err) {
      res.status(400).send({
        error: 'this req is error'
      })
    }
  },

// ==== create ====

  async create (req, res) {
    try {
      const product = await Product.create(req.body)
      res.send(product)
      console.log('created====',product)
    } catch (err) {
      console.log('============create song err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  }
}

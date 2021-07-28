const {Product, Category} = require('../models')

module.exports = {
  async findAll (req, res) {
    if (req) {
      console.log('')
    }
    try {
      const products = await Product.findAll(
        { 
          order: [
            ['createdAt', 'DESC']
          ],
          include: Category,
          // limit: 5,
          // offset: req.body.offset
        })
      res.send(products)
    } catch (err) {
      console.log('============get all songs err:', err)
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
    } catch (err) {
      console.log('CREATE PRODUCT ERRORS: ', err)
      res.status(400).send({
        error: 'THIS REQUEST IS ERRORS'
      })
    }
  },
  async update (req, res) {
    try {
      const product = await Product.update(req.body, {
        where: {
          id: req.body.id
        },
        returning: true
      })
      res.send(product)
      
    } catch (err) {
      console.log('============update product err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  },
  async delete (req, res) {
    try {
      await Product.destroy({
        where: {
          id: req.body.id
        },
        returning: true
      })
      
    } catch (err) {
      console.log('============delete product err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  }
}

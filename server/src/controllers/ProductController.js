const {Product, Category} = require('../models')

module.exports = {
  async findAllByArrayId (req, res) {
    try {
      const products = await Product.findAll(
        { 
          where: {
            id: req.body.ids
          }
        })
      res.send(products)
    } catch (err) {
      console.log('============get all products err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  },
  async findAll (res) {
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
      console.log('============get all products err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  },
  async findOneById (req, res) {
    try {
      if (!req.body.id) throw Error
      const product = await Product.findByPk(req.body.id,
        { 
          order: [
            ['createdAt', 'DESC']
          ],
          include: Category,
          // limit: 5,
          // offset: req.body.offset
        })
      res.send(product)
    } catch (err) {
      console.log('============get product err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  }
}

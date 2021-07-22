const {Order, Category} = require('../../models')

module.exports = {
  async findOneById (req, res) {
    console.log(req.body)
    try {
      res.send('success')
    } catch (err) {
      console.log('============get all order err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  },
  async findAll (res) {
    try {
      const order = await Order.findAll(
        {
          order: [
            ['createdAt', 'DESC']
          ],
          include: Category,
          // limit: 5,
          // offset: req.body.offset
        })
      res.send(order)
    } catch (err) {
      console.log('============get all Order err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  }
}

const {Order, User, OrderDetails, Product} = require('../../models')

module.exports = {
  async findAll (req, res) {
    console.log(req)
    try {
      const order = await Order.findAll(
        {
          include: [
            {
              model: OrderDetails,
              include: Product
            },
            User
          ]
        })
      res.send(order)
    } catch (err) {
      console.log('============get all Order err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  },
  async updateStatus (req, res) {
    console.log(req.body)
    try {
      const order = await Order.update(req.body, {
        where: {
          id: req.body.id
        },
        returning: true
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

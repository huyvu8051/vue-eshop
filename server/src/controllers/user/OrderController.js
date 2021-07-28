const {Order, User, OrderDetails, Product} = require('../../models')

module.exports = {
  async create (req, res) {
    console.log(req.body)
    try {
      const user = await User.findByPk(req.userId)
      const order = await Order.create(
        { 
          shipping_address: req.body.shippingInfo.shipping_address,
          email: user.email,
          status: 'progress',
          UserId: user.id
        })
      console.log(order)
      let initialValue = 0
      let amount = await req.body.cart.reduce(async (accumulator, element) => {
        let product = await Product.findByPk(element.id)

        OrderDetails.create({
          ProductId: product.id,
          price: product.price,
          quantity: element.quantity,
          OrderId: order.id
        })

        accumulator += element.quantity * product.price
        console.log('accumulator', accumulator)
      }, initialValue)
      console.log('Amount === ', amount)
      // Order.update({
      //   amount: 
      // })
      res.send(order)
    } catch (err) {
      console.log('============get all order err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  },
  async findAll (req, res) {
    try {
      const order = await Order.findAll(
        { 
          where: {
            UserId: req.userId
          },
          include: {
            model: OrderDetails,
            include: Product
          }

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

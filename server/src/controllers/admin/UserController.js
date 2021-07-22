const {User} = require('../../models')

module.exports = {
  async findAll (req, res) {
    console.log(req)
    try {
      const users = await User.findAll()
      res.send(users)
    } catch (err) {
      console.log('============get all User err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  }
}

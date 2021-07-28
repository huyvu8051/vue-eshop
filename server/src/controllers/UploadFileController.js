const {Category} = require('../models')

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
  async saveFile (req, res) {
    console.log(req.file)
    res.json({
      filename: req.file.filename
    })
  }
}

const {Artist} = require('../models')

module.exports = {
  async findAll (req, res) {
    try {
      const artists = await Artist.findAll()
      res.send(artists)
    } catch (err) {
      console.log('============get all songs err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  },
  async create (req, res) {
    try {
      const artist = await Artist.create(req.body)
      res.send(artist)
      console.log('created====',artist)
    } catch (err) {
      console.log('============create song err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  }
}

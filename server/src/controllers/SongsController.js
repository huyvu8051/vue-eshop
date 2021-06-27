const {Song, Artist} = require('../models')

module.exports = {
  async findAll (req, res) {
    try {
      const songs = await Song.findAll({ include: Artist })
      res.send(songs)
      console.log(songs)
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
      const song = await Song.create(req.body)
      res.send(song)
      console.log('created====',song)
    } catch (err) {
      console.log('============create song err:', err)
      res.status(400).send({
        error: 'this req is error'
      })
    }
  }
}

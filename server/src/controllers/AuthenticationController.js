const {User, Role} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const crypto = require('crypto');

function jwtSignUser (user) {
  const ONE_HOUR = 60 * 60
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_HOUR
  })
}

module.exports = {

  // =========== REGISTER ==============

  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },

  // =========== LOGIN ==============

  async login (req, res) {
    try {
      console.log('=================LOGIN===================')
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        },
        include: Role
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'sect239k1'
      });
      console.log(publicKey)

      // generate a signature of the payload
      const sign = crypto.createSign('SHA256');
      sign.write(`${user}`);
      sign.end();
      var signature = sign.sign(privateKey, 'hex');
      console.log(signature)

      var token = jwt.sign({ id: user.id }, signature, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      // console.log(user.Roles)

      for (let i = 0; i < user.Roles.length; i++) {
        authorities.push(user.Roles[i].name.toUpperCase());
      }
      

      res.send({
        id: user.id,
        email: user.email,
        roles: authorities,
        accessToken: token, // access token
        signature: signature // signature
      })
    } catch (err) {
        console.log('error: ', err)
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  }
}

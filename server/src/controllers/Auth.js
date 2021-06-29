const jwt = require('jsonwebtoken')
const { User, Role } = require('../models')

module.exports = {
    verifyToken (req, res, next) {
        let token = req.headers['accesstoken']
        let sign = req.headers['signature']
        console.log('req Auth=================', req.headers)

        if (!token) {
            return res.status(403).send({
                message: 'No token provided!'
            })
        }

        jwt.verify(token, sign, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: 'Unauthorized!'
                })
            }
            req.userId = decoded.id
            next()
        })
    },

    isAdmin (req, res, next) {
        User.findByPk(req.userId).then(async (user, err) => {
            if (err) {
                res.status(500).send({
                    message: err
                })
                return
            }

            await Role.findAll({
                attributes: ['name'],
                include: [{
                    model:User,
                    attributes: [],
                    // through: {
                    //     attributes: ['UserId']
                    // },
                    where: {
                        id: user.id
                    }
                }]
            }).then((roles, err) => {
                console.log('err', err)
                if (err) {
                    res.status(500).send({
                        message: err
                    })
                    return
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === 'ROLE_ADMIN') {
                        console.log('next')
                        return next()
                    }
                }
                res.status(403).send({
                    message: 'Require admin role!'
                })
            })
        

            
        })
    }
}
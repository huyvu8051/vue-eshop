const Joi = require('joi')

const EMAIL_ERROR = 'You must provide a valid email address'
const PASSWORD_ERROR = `The password provided failed to match the following rules
                    <br>
                    1. It must contain ONLY the following characters: lower case, upper case, nummeric.
                    <br>
                    2. It must be at least 8 characters in length and not greater than 32 characters in length.
                    `
const INVALID_ERROR = 'Invalid registration information'

const ERRORS = { 'email': EMAIL_ERROR, 'password': PASSWORD_ERROR }

module.exports = {
    register(req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        })

        const validation = schema.validate(req.body)
        //console.log(validation.error.details[0].context.key)
        

        if (validation.error) {
            const errorKey = validation.error.details[0].context.key
            if (errorKey in ERRORS) {
                res.status(400).send({
                    error: ERRORS[errorKey]
                })
            } else {
                res.status(400).send({
                    error: INVALID_ERROR
                })
            }

        } else {
            next()
        }



    }
}
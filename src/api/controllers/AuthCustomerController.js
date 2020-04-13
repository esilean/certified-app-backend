const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Customer = require('../models/Customer')

const emailRegex = /\S+@\S+\.\S+/


const login = (request, response) => {


    const { email = '', password = '' } = request.body

    Customer.findOne({
        where: {
            email,
        }
    }).then(data => {
        if (data) {
            const customer = data.get()

            if (customer !== null && bcrypt.compareSync(password, customer.password)) {
                const token = jwt.sign(customer, process.env.AUTH_SECRET, {
                    expiresIn: '1 day'
                })

                const { name } = customer
                return response.json({ name, email, token })
            }
        }

        return response.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: "Email or password is wrong.",
        })

    }).catch(err => {
        return response.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: err.message,
        })
    })
}

const signup = (request, response) => {

    const { name, email, password, confirmPassword } = request.body

    if (!email.match(emailRegex)) {
        return response.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: "Invalid email.",
        })
    }

    const salt = bcrypt.genSaltSync()
    const passHash = bcrypt.hashSync(password, salt)

    if (!bcrypt.compareSync(confirmPassword, passHash)) {
        return response.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: "Password does not match ConfirmPassword.",
        })
    }

    Customer.findOne({
        where: { email }
    }).then(data => {
        if (data !== null) {
            return response.status(400).send({
                statusCode: 400,
                error: "Bad Request",
                message: "Email already exists.",
            })
        } else {

            Customer.create({
                email,
                name,
                password: passHash,
                active: 1
            }).then(customer => {
                if (customer) login(request, response)
            }).catch(err => {
                return response.status(400).send({
                    statusCode: 400,
                    error: "Bad Request",
                    message: err.message,
                })
            })

        }

    }).catch(err => {
        return response.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: err.message,
        })
    })


}

const vtoken = (request, response) => {
    const token = request.body.token || ''

    jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
        return response.status(200).send({
            valid: !err
        })
    })
}


module.exports = {
    login,
    signup,
    vtoken,
}    
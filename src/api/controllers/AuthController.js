require("dotenv").config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const User = require('../../database/models/User')

const emailRegex = /\S+@\S+\.\S+/

const login = (request, response) => {

    const { email = '', password = '' } = request.body

    User.findOne({
        where: {
            email,
        }
    }).then(data => {

        if (data) {
            const user = data.get()
            const { id, name } = user

            if (user !== null && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id, name, email }, process.env.AUTH_SECRET, {
                    expiresIn: '1 day'
                })

                return response.json({ name, email, token })
            }
        }

        return response.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: "User or password is wrong.",
        })

    }).catch(err => {
        return response.status(400).send({
            statusCode: 400,
            error: "Bad Request",
            message: err.message,
        })
    })
}

const signup = async (request, response) => {

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

    User.findOne({
        where: { email }
    }).then(data => {
        if (data !== null) {
            return response.status(400).send({
                statusCode: 400,
                error: "Bad Request",
                message: "Email already exists.",
            })
        } else {

            const id = uuidv4()

            User.create({
                id,
                email,
                name,
                password: passHash
            }).then(user => {
                if (user) login(request, response)
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

const destroy = (request, response) => {
    const { id } = request.params
    const token = request.body.token || ''

    jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {

        if (!err) {
            User.destroy({ where: { id } })
        }

        return response.status(204).send()
    })

}

module.exports = {
    login,
    signup,
    vtoken,
    destroy,
}    
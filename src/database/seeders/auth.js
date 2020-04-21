const Users = require('../models/User')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')


async function generate() {

    await destroy()

    const id = uuidv4()
    const name = 'Leandro'
    const email = 'le.bevilaqua@gmail.com'
    const password = '123'

    const salt = bcrypt.genSaltSync()
    const passHash = bcrypt.hashSync(password, salt)

    await Users.create({
        id,
        email,
        name,
        password: passHash
    })

}

async function destroy() {

    await Users.destroy({ where: {}, })

}

module.exports = {
    generate,
    destroy
}
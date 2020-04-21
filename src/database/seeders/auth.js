const Users = require('../models/User')
const bcrypt = require('bcrypt')


async function generate() {

    await destroy()

    const id = 'x37592d6-a41d-4301-99a4-a87740afa2b7'
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
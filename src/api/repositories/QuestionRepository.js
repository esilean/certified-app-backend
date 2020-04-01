const Questions = require('../models/Question')

module.exports = {
    async findAll() {
        const questions = await Questions.findAll({ include: 'answers' });

        return questions
    },

    async create(question) {

        const { title, description, image_url, value, active } = question

        const questionResp = await Questions.create({ title, description, image_url, value, active })
        return questionResp

    },

    async update(id, question) {

        const { title, description, image_url, value, active } = question

        await Questions.update({
            title, description, image_url, value, active
        }, {
            where: {
                id
            }
        })

        let questionResp = await Questions.findOne({ where: { id } })

        return questionResp

    },
    async destroy(id) {

        await Questions.destroy({ where: { id } })

    },
}
const Answers = require('../models/Answer');

module.exports = {
    async findAll(question_id) {
        const answers = await Answers.findAll({ where: { question_id }, include: 'questions' })
        return answers
    },

    async findByAnswerId(id) {
        const answer = await Answers.findByPk(id)
        return answer
    },


    async create(question_id, answer) {

        const { name, valid, active } = answer

        const answerResp = await Answers.create({ name, valid, active, question_id })
        return answerResp

    },

    async update(id, answer) {
        const { name, valid, active } = answer

        await Answers.update({
            name, valid, active,
        }, {
            where: {
                id
            }
        })

        let answerResp = await Answers.findOne({ where: { id } })

        return answerResp

    },
    async destroy(id) {

        await Answers.destroy({ where: { id } })
    },
}
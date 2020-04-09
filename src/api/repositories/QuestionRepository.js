const Sequelize = require('sequelize')
const Questions = require('../models/Question')
const Answers = require('../models/Answer')


module.exports = {
    async findAll() {
        const questions = await Questions.findAll({ order: [['updated_at', 'desc']], include: ['answers'] });

        return questions
    },

    async findXRandomQuestionWithAnswers(x) {
        const questions = await Questions.findAll({ limit: x, where: { active: true }, order: Sequelize.literal('rand()'), include: [{ association: 'answers', required: true }] });

        return questions
    },

    async findQuestionById(question_id) {
        const questionResp = await Questions.findByPk(id = question_id);

        return questionResp
    },

    async create(question) {
        const { title, description, value, active, answers } = question

        const questionResp = await Questions.create({ title, description, value, active, answers }, {
            include: ['answers']
        })
        return questionResp

    },

    async update(id, question) {

        const { title, description, value, active, answers } = question
        await Questions.update({ title, description, value, active },
            {
                where: {
                    id
                }
            })

        let questionResp = await Questions.findOne({ where: { id } })

        return questionResp

    },
    async updateAndCreateQuestions(id, question) {

        const { title, description, value, active, answers } = question

        const answersWithQuestionId = answers.map(ans => {
            return { ...ans, question_id: id }
        })


        //exclui todas as respostas
        const response = await Answers.findAll({ raw: true, attributes: ['id'], where: { question_id: id } })
        const ids = response.map(resp => { return resp.id })
        await Answers.destroy({ where: { id: ids } })

        //atualiza a pergunta e insere as respostas
        await Questions.update({ title, description, value, active },
            {
                where: {
                    id
                }
            }).then(() => Answers.bulkCreate(answersWithQuestionId))

        let questionResp = await Questions.findOne({ where: { id } })

        return questionResp

    },



    async destroy(id) {

        await Questions.destroy({ where: { id } })

    },
}


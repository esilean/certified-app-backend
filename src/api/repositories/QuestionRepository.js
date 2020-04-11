const Sequelize = require('sequelize')
const Questions = require('../models/Question')
const Answers = require('../models/Answer')



module.exports = {
    async findAll() {
        const questions = await Questions.findAll({
            attributes: {
                include: [
                    [Sequelize.literal('ifnull((select 0 from customerStageOnes csq where csq.question_id = question.id limit 1), 1)'), 'canUpdate']
                ]
            },
            include: ['answers'],
            order: [['updated_at', 'desc']]
        })

        //example query more complex
        // const questions = await Questions.findAll({
        //     attributes: [
        //         'id', 'title', 'description', 'value', 'active', 'image_url', 'image_name', 'image_key', 'image_size', 'created_at', 'updated_at',
        //         [Sequelize.fn('COUNT', Sequelize.col('customerAttemptQuestions.id')), 'no_question_ans']
        //     ],
        //     include: [
        //         {
        //             association: 'answers',
        //             required: true,
        //         },
        //         {
        //             association: 'customerAttemptQuestions',
        //             required: false,
        //             attributes: []
        //         }
        //     ],
        //     group: ['question.id', 'answers.id'],
        //     order: [['updated_at', 'desc']],
        // })




        return questions
    },

    async findXRandomQuestionWithAnswers(x) {
        const questions = await Questions.findAll({
            include: [{ association: 'answers', required: true }],
            where: { active: true },
            order: Sequelize.literal('rand()'),
            limit: x,
        })

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


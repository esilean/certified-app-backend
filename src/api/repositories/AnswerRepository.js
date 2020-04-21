const Answers = require('../../database/models/Answer');

async function findAll(question_id) {
    const answers = await Answers.findAll({ where: { question_id }, include: 'question' })
    return answers
}

async function findByPk(id) {
    const answer = await Answers.findByPk(id, { include: 'question' })
    return answer
}

async function create(question_id, answer) {

    const { name, valid, active } = answer

    const answerResp = await Answers.create({ name, valid, active, question_id })
    return answerResp

}

async function update(id, answer) {
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

}
async function destroy(id) {

    await Answers.destroy({ where: { id } })
}

module.exports = {
    findAll,
    findByPk,
    create,
    update,
    destroy,
}
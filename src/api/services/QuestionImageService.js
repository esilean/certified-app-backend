const QuestionImageRepository = require('../repositories/QuestionImageRepository')

async function create(id, request) {

    const questionImg = await QuestionImageRepository.create(id, request)
    return questionImg
}

async function update(id) {

    await QuestionImageRepository.update(id)

}

module.exports = {
    create,
    update
}
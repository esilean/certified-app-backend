
const QuestionImageService = require('../services/QuestionImageService')
const QuestionService = require('../services/QuestionService')

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

module.exports = {

    async store(request, response) {
        const { id } = request.params

        const questionImg = await QuestionImageService.storeImg(id, request)

        return response.json(questionImg)
    },

    async destroyImgFromStorage(request, response, next) {

        const { id } = request.params

        const question = await QuestionService.findQuestionById(id)
        if (question) {
            if (process.env.STORAGE_TYPE === 'local') {
                promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "..", "srcimages", "uploads", question.image_key))
            }
        }

        next()
    },

    async destroy(request, response) {
        const { id } = request.params

        await QuestionImageService.destroyImg(id, '')

        return response.send()
    },

}




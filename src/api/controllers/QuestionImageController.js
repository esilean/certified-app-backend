
const QuestionImageService = require('../services/QuestionImageService')
const QuestionService = require('../services/QuestionService')

const sharp = require('sharp')

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')


module.exports = {

    async store(request, response) {
        const { id } = request.params

        const questionImg = await QuestionImageService.storeImg(id, request)

        return response.json(questionImg)
    },

    async resizeImage(request, response, next) {

        if (!request.file) return next();
        //const filepath = path.resolve(__dirname, "..", "..", "..", "srcimages", "uploads", `${request.file.filename}`)

        sharp.cache(false)
        await sharp(request.file.path)
            .toFormat('jpeg')
            .jpeg({ quality: 50 })
            .toBuffer(function (err, buffer) {
                fs.writeFile(request.file.path, buffer, function (e) {
                })
            })

        next()
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




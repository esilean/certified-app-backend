
const QuestionImageService = require('../services/QuestionImageService')
const QuestionService = require('../services/QuestionService')

const sharp = require('sharp')

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')


async function create(request, response) {
    const { id } = request.params

    const questionImg = await QuestionImageService.create(id, request)

    return response.json(questionImg)
}

async function resizeImage(request, response, next) {

    if (!request.file)
        return next();

    sharp.cache(false)
    await sharp(request.file.path)
        .toFormat('jpeg')
        .jpeg({ quality: 50 })
        .toBuffer(function (err, buffer) {
            fs.writeFile(request.file.path, buffer, function (e) {
            })
        })

    next()
}

async function destroyImageFromStorage(request, response, next) {

    const { id } = request.params

    const question = await QuestionService.findByPk(id)
    if (question) {
        if (process.env.STORAGE_TYPE === 'local') {
            promisify(fs.unlink)(path.resolve(__dirname, "..", "..", "..", "srcimages", "uploads", question.image_key))
        }
    }

    next()
}

async function destroy(request, response) {
    const { id } = request.params

    await QuestionImageService.update(id)

    return response.status(204).send()
}

module.exports = {
    create,
    resizeImage,
    destroyImageFromStorage,
    destroy,
}




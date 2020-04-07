const QuestionImageRepository = require('../repositories/QuestionImageRepository')

module.exports = {

    async storeImg(id, request) {

        const questionImg = await QuestionImageRepository.storeImg(id, request)
        return questionImg
    },
    
    async destroyImg(id, key) {

        await QuestionImageRepository.destroyImg(id, key)
        
    },    

}
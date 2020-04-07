const Questions = require('../models/Question')

module.exports = {
    async storeImg(id, request) {

        let { originalname: image_name, key: image_key, location: image_url = '' } = request.file

        if (image_url === '')
            image_url = `${process.env.APP_URL}/files/${image_key}`

        await Questions.update({
            image_name, image_key, image_url
        }, {
            where: {
                id
            }
        })

        let questionResp = await Questions.findOne({ where: { id } })

        return questionResp

    },


    async destroyImg(id, key) {

        await Questions.update({
            image_name: '', image_key: '', image_url: ''
        }, {
            where: {
                id
            }
        })

        let questionResp = await Questions.findOne({ where: { id } })

        return questionResp

    },
}
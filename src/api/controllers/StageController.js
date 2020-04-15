const Stages = require('../models/Stage');

module.exports = {
    async index(request, response) {
        const { id } = request.params

        if (id) {
            let stage = await Stages.findByPk(id)
            if (stage === null)
                return response.status(400).send()

            return response.json(stage)
        } else {
            const stages = await Stages.findAll()
            return response.json(stages)
        }

    },
    async update(request, response) {
        const { id } = request.params
        // const { name, title_ini, description_ini, video_url_ini, title_end, description_end, video_url_end, duration_min, question_qty } = request.body

        await Stages.update(request.body, {
            where: {
                id
            }
        })

        let stage = await Stages.findByPk(id)

        return response.json(stage)
    },


}
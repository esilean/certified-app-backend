const Stages = require('../../database/models/Stage');

module.exports = {
    async index(request, response) {
        const { id } = request.params

        if (id) {
            let stage = await Stages.findByPk(id)
            if (stage === null)
                return response.status(404).send()

            return response.json(stage)
        } else {
            const stages = await Stages.findAll()
            return response.json(stages)
        }

    },
    async update(request, response) {
        const { id } = request.params

        await Stages.update(request.body, {
            where: {
                id
            }
        })

        let stage = await Stages.findByPk(id)

        return response.json(stage)
    },


}
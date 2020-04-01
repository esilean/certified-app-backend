const Stages = require('../models/Stage');

module.exports = {
    async index(request, response) {
        const stages = await Stages.findAll()
        return response.json(stages)
    },

    
}
const Questions = require('../models/Question')
const Answers = require('../models/Answer')

async function generate() {

    await destroy()

    const seed = [
        {
            id: 1, title: 'Qual a cor do Mar?', description: 'pense na cor do céu...', value: 1, image_url: '', image_name: '', image_key: '', image_size: 12, active: true,
            answers: [
                {
                    id: 1, name: 'Azul', valid: true, active: true, question_id: 1,
                }, {
                    id: 2, name: 'Amarelo', valid: true, active: false, question_id: 1,
                }, {
                    id: 3, name: 'Verde', valid: true, active: false, question_id: 1,
                }
            ]
        },
        {
            id: 2, title: 'Qual a cor do Céu?', description: '', value: 1, image_url: '', image_name: '', image_key: '', image_size: null, active: true,
            answers: [
                {
                    id: 4, name: 'Azul', valid: true, active: true, question_id: 2,
                }, {
                    id: 5, name: 'Amarelo', valid: true, active: false, question_id: 2,
                }, {
                    id: 6, name: 'Verde', valid: true, active: false, question_id: 2,
                }
            ]
        },
        {
            id: 3, title: 'Qual a cor da Esperança?', description: '', value: 1, image_url: '', image_name: '', image_key: '', image_size: 0, active: true,
            answers: [
                {
                    id: 7, name: 'Azul', valid: true, active: true, question_id: 3,
                }, {
                    id: 8, name: 'Amarelo', valid: true, active: false, question_id: 3,
                }, {
                    id: 9, name: 'Verde', valid: true, active: false, question_id: 3,
                }
            ]
        },
        {
            id: 4, title: 'Qual a cor do Sol?', description: '', value: 1, image_url: '', image_name: '', image_key: '', image_size: 0, active: true,
            answers: [
                {
                    id: 10, name: 'Azul', valid: true, active: true, question_id: 4,
                }, {
                    id: 11, name: 'Amarelo', valid: true, active: false, question_id: 4,
                }, {
                    id: 12, name: 'Verde', valid: true, active: false, question_id: 4,
                }
            ]
        },
        {
            id: 5, title: 'Qual a cor da Lua?', description: '', value: 1, image_url: '', image_name: '', image_key: '', image_size: 0, active: true,
            answers: [
                {
                    id: 13, name: 'Azul', valid: true, active: true, question_id: 5,
                }, {
                    id: 14, name: 'Amarelo', valid: true, active: false, question_id: 5,
                }, {
                    id: 15, name: 'Verde', valid: true, active: false, question_id: 5,
                }
            ]
        },
        {
            id: 6, title: 'Qual a cor da rua?', description: '', value: 1, image_url: '', image_name: '', image_key: '', image_size: 0, active: true,
            answers: []
        },
        {
            id: 7, title: 'Qual a cor da lombada?', description: '', value: 1, image_url: '', image_name: '', image_key: '', image_size: 0, active: true,
            answers: []
        },        
    ]

    await Questions.bulkCreate(seed, { include: ['answers'] })

}

async function destroy() {

    await Answers.destroy({ where: {}, })
    await Questions.destroy({ where: {}, })

}

module.exports = {
    generate,
    destroy
}
const responseApi = require('../utils/responseApi')

const CustomerStageRepository = require('../repositories/CustomerStageRepository');
const CustomerStageOneRepository = require('../repositories/CustomerStageOneRepository');
const CustomerRepository = require('../repositories/CustomerRepository');
const QuestionRepository = require('../repositories/QuestionRepository');



module.exports = {
    async findByCustomerId(customer_id) {

        const respCustStage = await CustomerStageRepository.findByCustomerId(customer_id)

        return respCustStage
    },
    async findByCustomerIdAndStageId(customer_id, stage_id) {

        const respCustStage = await CustomerStageRepository.findByCustomerIdAndStageId(customer_id, stage_id)

        return respCustStage
    },

    async create(customer_id, stage_id, custStage) {

        // inicializar resposta de erro
        responseApi.statusCode = 200

        //verifica se o cliente existe
        const customerIdExist = await CustomerRepository.findByCustomerId(customer_id)
        if (!customerIdExist || customerIdExist === null) {
            responseApi.statusCode = 404
            responseApi.resp = false
            responseApi.message = 'O \"cliente\" para esta \"tentativa\" não foi informado.'
            return responseApi
        }

        const respStageOpened = await validateStageOpened(customer_id, stage_id)
        if (respStageOpened)
            return respStageOpened

        // criar tentativa da etapa
        const customerStage = await CustomerStageRepository.create(customer_id, stage_id, custStage)

        //se etapa 1, abrir X questoes aleatorias
        if (stage_id === 1) {
            const { qty_questions } = custStage
            await generateRandomQuestions(customerStage.id, qty_questions)
        }

        return customerStage

    },

    async update(id, custStage) {

        const customerStage = await CustomerStageRepository.update(id, custStage)

        return customerStage

    },
    async destroy(id) {

        responseApi.resp = false
        responseApi.message = 'Não será possível excluir esta \"tentativa\".'

        const custStageHasQuestion = await CustomerStageOneRepository.findByCustomerStageId(id)

        if (custStageHasQuestion && custStageHasQuestion.length === 0) {

            await CustomerStageRepository.destroy(id)
            responseApi.resp = true
            responseApi.message = 'Excluído com sucesso.'

        }

        return responseApi

    },
}


async function generateRandomQuestions(customer_stage_id, qty) {


    const questions = await QuestionRepository.findXRandomQuestionWithAnswers(qty)

    let order = 1
    let custStageQuestions = []
    questions.forEach(async quest => {

        custStageQuestions.push({
            customer_stage_id: customer_stage_id,
            question_id: quest.id,
            value: 0,
            order
        })

        order = order + 1
    });

    await CustomerStageOneRepository.bulkCreate(custStageQuestions)

}


async function validateStageOpened(customer_id, stage_id) {
    // regra para criacao de tentativas e etapas
    const custStages = await CustomerStageRepository.findByCustomerId(customer_id)
    // 1ª - se existir qualquer tentativa em aberto, bloqueia
    let custStageIsOpened = custStages.filter(x => x.date_end === null)
    if (custStageIsOpened && custStageIsOpened.length > 0) {
        responseApi.statusCode = 400
        responseApi.message = 'Não será possível abrir uma nova \"etapa\". Já existe etapa em andamento'
        return responseApi
    }

    //2ª - se existir etapa aprovada
    custStageIsOpened = custStages.filter(x => x.stage_id === stage_id && x.approved === true)
    if (custStageIsOpened && custStageIsOpened.length > 0) {
        responseApi.statusCode = 400
        responseApi.message = 'Não será possível abrir uma nova \"etapa\". Você já foi aprovado'
        return responseApi
    }

    //3ª - so pode criar etapa se a anterior foi aprovada
    if (stage_id > 1) // não é preciso validar a primeira etapa
    {
        //procuro saber se a etapa anterior (stage_id - 1) foi aprovada
        custStageIsOpened = custStages.filter(x => x.stage_id === (stage_id - 1) && x.approved === true)

        if (!custStageIsOpened || custStageIsOpened.length <= 0) {
            responseApi.statusCode = 400
            responseApi.message = 'Não será possível abrir uma nova \"etapa\". Você não foi aprovado.'
            return responseApi
        }
    }

    return
}
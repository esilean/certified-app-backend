const responseApi = require('../utils/responseApi')

const CustomerAttemptRepository = require('../repositories/CustomerAttemptRepository');
const CustomerAttemptQuestionRepository = require('../repositories/CustomerAttemptQuestionRepository');
const CustomerRepository = require('../repositories/CustomerRepository');
const QuestionRepository = require('../repositories/QuestionRepository');

const CustomerAttemptQuestion = require('../models/CustomerAttemptQuestion')


module.exports = {
    async findByCustomerId(customer_id) {

        const customerAttempts = await CustomerAttemptRepository.findByCustomerId(customer_id)

        return customerAttempts
    },
    async findByCustomerIdAndStage(customer_id, stage_id) {

        const customerAttempts = await CustomerAttemptRepository.findByCustomerIdAndStage(customer_id, stage_id)

        return customerAttempts
    },

    async create(customer_id, stage_id, custAttempt) {

        // inicializar resposta de erro
        responseApi.statusCode = 200

        //verifica se o cliente existe
        const customerIdExist = await CustomerRepository.findCustomerById(customer_id)
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
        const customerAttempt = await CustomerAttemptRepository.create(customer_id, stage_id, custAttempt)

        //se etapa 1, abrir X questoes aleatorias
        if (stage_id === 1) {
            const questionsCreated = await generateRandomQuestions(customerAttempt.id, 10)
        }



        return customerAttempt

    },

    async update(id, custAttempt) {


        // so pode atualizar se date_end for null???? e se o usuario cliclou no botao errado?! EM ABERTO!

        const customerAttempt = await CustomerAttemptRepository.update(id, custAttempt)

        return customerAttempt

    },
    async destroy(id) {

        responseApi.resp = false
        responseApi.message = 'Não será possível excluir esta \"tentativa\".'

        const custAttHasQuestion = await CustomerAttemptQuestionRepository.findByCustAttemptId(id)

        if (custAttHasQuestion && custAttHasQuestion.length === 0) {

            await CustomerAttemptRepository.destroy(id)
            responseApi.resp = true
            responseApi.message = 'Excluído com sucesso.'

        }

        return responseApi

    },
}


async function generateRandomQuestions(custAttemptId, qty) {


    const questions = await QuestionRepository.findXRandomQuestionWithAnswers(qty)

    let order = 1
    let custAttpsQuestions = []
    questions.forEach(async quest => {

        custAttpsQuestions.push({
            customer_attempt_id: custAttemptId,
            question_id: quest.id,
            order
        })

        order = order + 1
    });

    await CustomerAttemptQuestionRepository.bulkCreate(custAttpsQuestions)


}


async function validateStageOpened(customer_id, stage_id) {
    // regra para criacao de tentativas e etapas
    const custAtts = await CustomerAttemptRepository.findByCustomerId(customer_id)
    // 1ª - se existir qualquer tentativa em aberto, bloqueia
    let custAttsIsOpened = custAtts.filter(x => x.date_end === null)
    if (custAttsIsOpened && custAttsIsOpened.length > 0) {
        responseApi.statusCode = 400
        responseApi.message = 'Não será possível abrir uma nova \"etapa\". Já existe etapa em andamento'
        return responseApi
    }

    //2ª - se existir etapa aprovada
    custAttsIsOpened = custAtts.filter(x => x.stage_id === stage_id && x.approved === 1)
    if (custAttsIsOpened && custAttsIsOpened.length > 0) {
        responseApi.statusCode = 400
        responseApi.message = 'Não será possível abrir uma nova \"etapa\". Você já foi aprovado'
        return responseApi
    }

    //3ª - so pode criar etapa se a anterior foi aprovada
    if (stage_id > 1) // não é preciso validar a primeira etapa
    {
        //procuro saber se a etapa anterior (stage_id - 1) foi aprovada
        custAttsIsOpened = custAtts.filter(x => x.stage_id === (stage_id - 1) && x.approved === 1)
        //console.log(custAttsIsOpened)
        if (!custAttsIsOpened || custAttsIsOpened.length <= 0) {
            responseApi.statusCode = 400
            responseApi.message = 'Não será possível abrir uma nova \"etapa\". Você não foi aprovado.'
            return responseApi
        }
    }

    return
}
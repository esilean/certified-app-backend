const responseApi = require('../utils/responseApi')

const CustomerStageRepository = require('../repositories/CustomerStageRepository');
const CustomerStageOneRepository = require('../repositories/CustomerStageOneRepository');
const CustomerRepository = require('../repositories/CustomerRepository');
const QuestionRepository = require('../repositories/QuestionRepository');

const trans = require('../repositories/Transactions')

module.exports = {
    async findByCustomerId(customer_id) {

        const respCustStage = await CustomerStageRepository.findByCustomerId(customer_id)

        return respCustStage
    },
    async findCurrentStage(customer_id, stage_id) {

        const customerStage = await CustomerStageRepository.findCurrentStage(customer_id, stage_id)

        return customerStage
    },

    async create(customer_id, stage_id, custStage) {

        // inicializar resposta de erro
        responseApi.statusCode = 200
        let customerStage = {}


        //abre transacao
        const transaction = await trans.begin()
        try {

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
            const customerStageCreated = await CustomerStageRepository.create(transaction, customer_id, stage_id, custStage)

            //se etapa 1, abrir X questoes aleatorias
            if (stage_id === 1) {
                const { questions_qty } = custStage
                await generateRandomQuestions(transaction, customerStageCreated.id, questions_qty)
            }

            //commita transacao
            await trans.commit(transaction)

            customerStage = await CustomerStageRepository.findCurrentStage(customer_id, stage_id)
            return customerStage


        } catch (error) {
            //volta transacao
            await trans.rollback(transaction)
        }

        return customerStage

    },

    async update(id, custStage) {

        const customerStage = await CustomerStageRepository.update(id, custStage)

        return customerStage

    },
    async calculateResult(id) {

        const customerStage = await CustomerStageRepository.findByPkToCalculateResult(id)

        const { grade_perc_min, customerStageOnes } = customerStage

        const totalValueQuestions = customerStageOnes.reduce((total, q) => {
            return q.value + total
        }, 0)

        //how many questions did he/she get right? and how much points(value) did he get?
        const totalValueRightQuestions = customerStageOnes.filter(q => {
            return q.answer_id === q.question.answers[0].id
        }).reduce((total, q) => {
            return q.value + total
        }, 0)

        const grade_perc = ((totalValueRightQuestions / totalValueQuestions) * 100.00)

        const resp = {
            grade_perc,
            grade_perc_min,
            approved: (grade_perc >= grade_perc_min)
        }

        return resp

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


async function generateRandomQuestions(transaction, customer_stage_id, qty) {


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

    await CustomerStageOneRepository.bulkCreate(transaction, custStageQuestions)

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
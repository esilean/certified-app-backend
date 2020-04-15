const responseApi = require('../utils/responseApi')

const CustomerRepository = require('../repositories/CustomerRepository');
const CustomerStageRepository = require('../repositories/CustomerStageRepository');

module.exports = {
    async findAll() {
        const customers = await CustomerRepository.findAll()
        return customers
    },

    async findByCustomerId(id) {
        const customers = await CustomerRepository.findByCustomerId(id)
        return customers
    },

    async update(id, customer) {

        const customerResp = await CustomerRepository.update(id, customer)

        return customerResp

    },
    async destroy(id) {

        responseApi.resp = false
        responseApi.message = 'Não será possível excluir este \"cliente\".'

        const customerHasStage = await CustomerStageRepository.findByCustomerId(id)

        if (customerHasStage && customerHasStage.length === 0) {

            await CustomerRepository.destroy(id)
            responseApi.resp = true
            responseApi.message = 'Excluído com sucesso.'

        }

        return responseApi

    },
}
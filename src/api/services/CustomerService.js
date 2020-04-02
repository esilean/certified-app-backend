const responseApi = require('../utils/responseApi')

const CustomerRepository = require('../repositories/CustomerRepository');
const CustomerAttemptRepository = require('../repositories/CustomerAttemptRepository');

module.exports = {
    async findAll() {
        const customers = await CustomerRepository.findAll()
        return customers
    },

    async create(customer) {

       // inicializar resposta de erro
       responseApi.statusCode = 200
       
        const emailHasCustomer = await CustomerRepository.findCustomerByEmail(customer.email)
        if(emailHasCustomer && emailHasCustomer.length > 0)
        {
            responseApi.statusCode = 404
            responseApi.resp = false
            responseApi.message = 'O \"email\" informado já está cadastrado.'            
            return responseApi
        }

        const customerResp = await CustomerRepository.create(customer)

        return customerResp
    },

    async update(id, customer) {

        const customerResp = await CustomerRepository.update(id, customer)

        return customerResp

    },
    async destroy(id) {

        responseApi.resp = false
        responseApi.message = 'Não será possível excluir este \"cliente\".'

        const customerHasAttempt = await CustomerAttemptRepository.findByCustomerId(id)

        if (customerHasAttempt && customerHasAttempt.length === 0) {

            await CustomerRepository.destroy(id)
            responseApi.resp = true
            responseApi.message = 'Excluído com sucesso.'

        }

        return responseApi

    },
}
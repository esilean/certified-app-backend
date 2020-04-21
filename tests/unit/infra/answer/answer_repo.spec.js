const connection = require('../../../../src/database')
const trans = require('../../../../src/api/repositories/Transactions')

const AnswerRepository = require('../../../../src/api/repositories/AnswerRepository')

beforeAll(() => {

})
afterAll(async () => {
    await connection.close()
})

describe('Validating repositories', () => {


    describe('Answer repository', () => {

        it('Should return all answers from one question', async () => {

            const answers = await AnswerRepository.findAll(1)

            expect(answers.length).toBeGreaterThan(0)
        })

        it('Should return one answer and which question it belongs', async () => {

            const answer = await AnswerRepository.findByAnswerId(1)

            expect(answer).toHaveProperty('id')
            expect(answer).toHaveProperty('question')
            expect(answer.question).toHaveProperty('id')
        })
    })



})


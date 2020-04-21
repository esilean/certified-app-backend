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

            const answer = await AnswerRepository.findByPk(1)

            expect(answer).toHaveProperty('id')
            expect(answer).toHaveProperty('question')
            expect(answer.question).toHaveProperty('id')
        })

        it('Should create one answer', async () => {

            const data = {
                name: 'the answer',
                valid: 0,
                active: 1,
            }

            const answer = await AnswerRepository.create(1, data)

            expect(answer).toHaveProperty('id', 'valid', 'active')
            expect(answer.id).toBeGreaterThan(0)
        })

        it('Should update one answer', async () => {

            const data = {
                name: 'the answer 222',
                valid: 1,
                active: 1,
            }

            const answer = await AnswerRepository.update(1, data)

            expect(answer).toHaveProperty('id', 'valid', 'active')
            expect(answer).toHaveProperty('name', 'the answer 222')
            expect(answer.id).toEqual(1)
        })

        it('Should delete one answer', async () => {

            await AnswerRepository.destroy(6)
            const answer = await AnswerRepository.findByPk(6)

            expect(answer).toBeNull()

        })

    })



})


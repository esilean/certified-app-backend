const connection = require('../../../src/database')
const trans = require('../../../src/api/repositories/Transactions')

const QuestionRepository = require('../../../src/api/repositories/QuestionRepository')
const AnswerRepository = require('../../../src/api/repositories/AnswerRepository')

beforeAll(() => {

})
afterAll(async () => {
    await connection.close()
})

describe('Validating repositories', () => {

    /*ANSWERS*/
    /*ANSWERS*/
    /*ANSWERS*/
    describe('Answers repository', () => {

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



    /*QUESTIONS*/
    /*QUESTIONS*/
    /*QUESTIONS*/
    describe('Questions repository', () => {

        it('Should return all questions', async () => {

            const questions = await QuestionRepository.findAll()

            expect(questions.length).toBeGreaterThan(0)
        })

        it('Should return one question', async () => {

            const question = await QuestionRepository.findByPk(1)

            expect(question.id).toBeGreaterThan(0)
        })

        it('Should return X questions', async () => {

            const questions = await QuestionRepository.findXRandomQuestionWithAnswers(3)

            expect(questions).toHaveLength(3)
        })

        it('Should create a question', async () => {

            const data = {
                title: 'Qual a cor do asfalto?',
                description: '...',
                value: 5,
                active: true,
                answers: [
                    {
                        name: 'Preto', valid: true, active: true,
                    },
                    {
                        name: 'Cinza', valid: false, active: true,
                    }
                ]
            }

            const transaction = await trans.begin()
            const question = await QuestionRepository.create(transaction, data)
            await trans.commit(transaction)

            expect(question).toHaveProperty('id')
            expect(question).toHaveProperty('title', 'Qual a cor do asfalto?')
            expect(question).toHaveProperty('value', 5)
            expect(question).toHaveProperty('active', true)
            expect(question).toHaveProperty('answers')
            expect(question.answers).toHaveLength(2)
            expect(question.answers[0]).toHaveProperty('name', 'Preto')
        })

        it('Should update question and insert new answers', async () => {

            const data = {
                title: 'Que cor é essa?',
                description: '...',
                value: 10,
                active: false,
                answers: [
                    {
                        id: 1, name: 'Cor', valid: true, active: true,
                    }
                ]
            }

            const transaction = await trans.begin()
            const question = await QuestionRepository.updateAndCreateQuestions(transaction, 1, data)
            await trans.commit(transaction)

            expect(question).toHaveProperty('title', 'Que cor é essa?')
            expect(question).toHaveProperty('value', 10)
            expect(question).toHaveProperty('active', false)
            expect(question).toHaveProperty('answers')
            expect(question.answers).toHaveLength(1)
            expect(question.answers[0]).toHaveProperty('name', 'Cor')
        })

        it('Should delete a question with no answer', async () => {

            await QuestionRepository.destroy(6)
            const question = await QuestionRepository.findByPk(6)

            expect(question).toBeNull()

        })

    })
})


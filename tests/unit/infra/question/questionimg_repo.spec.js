const connection = require('../../../../src/database')
const QuestionImageRepository = require('../../../../src/api/repositories/QuestionImageRepository')

beforeAll(() => {

})
afterAll(async () => {
    await connection.close()
})

describe('Validating repositories', () => {

    describe('Question Image repository', () => {

        it('Should update image in a question', async () => {

            const data = {
                file: {
                    originalname: 'G0702648.JPG',
                    key: '27d09c10585fc6292ceeeb5b17fc28a7-G0702648.JPG',
                    location: 'http://localhost:3000/files/27d09c10585fc6292ceeeb5b17fc28a7-G0702648.JPG',
                    size: 3410682
                }
            }

            const question = await QuestionImageRepository.create(1, data)

            expect(question).toHaveProperty('id')
            expect(question).toHaveProperty('image_name', 'G0702648.JPG')
            expect(question).toHaveProperty('image_url', 'http://localhost:3000/files/27d09c10585fc6292ceeeb5b17fc28a7-G0702648.JPG')

        })


        it('Should update image fields to empty or zero', async () => {

            const question = await QuestionImageRepository.update(3)

            expect(question.image_name).toEqual('')
            expect(question.image_key).toEqual('')
            expect(question.image_url).toEqual('')
            expect(question.image_size).toEqual(0)

        })

    })
})


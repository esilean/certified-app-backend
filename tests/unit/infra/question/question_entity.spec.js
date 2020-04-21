const Question = require('../../../../src/database/models/Question')

beforeAll(() => {

})
afterAll(async () => {

})

describe('Validating Entity', () => {

    describe('Question Model', () => {

        it('should return instance with passed attributes', () => {
            const questionMocked = {
                id: 1,
                title: 'the title',
                description: 'the description',
                value: 1,
                image_url: 'the image_url',
                image_name: 'the image_name',
                image_key: 'the image_key',
                image_size: 1,
                active: true,
            }

            const entity = new Question(questionMocked)

            expect(entity).toBeInstanceOf(Question)
            expect(entity.id).toEqual(1)
            expect(entity.title).toEqual('the title')

        })


    })

})


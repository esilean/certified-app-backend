const connection = require('../../../../src/database')
const request = require('supertest')
const app = require('../../../../src/app')

let auth = {}

beforeAll(async () => {

    const data = {
        email: "le.bevilaqua@gmail.com",
        password: "123",
    }

    const response = await request(app)
        .post('/sec/login')
        .send(data)

    console.log(123)
    console.log(`TOKEN: ${response}`)

    const { name, email, token } = response.body

    auth = {
        name,
        email,
        token
    }

})
afterAll(async () => {
    await connection.close()
})

describe('Validating Endpoints', () => {

    describe('Question API', () => {

        it('should find all questions', async () => {

            const response = await request(app)
                .get('/questions')
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)
            expect(response.body.length).toBeGreaterThan(0)

        })

        it('should find one question', async () => {

            const response = await request(app)
                .get('/questions/1')
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)
            expect(response.body).toHaveProperty('id')
        })


        it('should not find a question', async () => {

            const response = await request(app)
                .get('/questions/999')
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(404)
        })


        it('should create a question with answers', async () => {

            const data = {
                title: 'Qual a cor da terra?',
                description: '...lama',
                value: 12,
                active: 1,
                answers: [
                    {
                        name: 'Marrom', valid: 1, active: 1,
                    },
                    {
                        name: 'Vermelha', valid: 0, active: 1,
                    }
                ]
            }
            const response = await request(app)
                .post('/questions')
                .send(data)
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)
            expect(response.body).toHaveProperty('id')

        })

        it('should not create a question with answers (NO TOKEN PROVIDED)', async () => {

            const data = {
                title: 'Qual a cor da terra?',
                description: '...lama',
                value: 12,
                active: 1,
                answers: [
                    {
                        name: 'Marrom', valid: 1, active: 1,
                    },
                    {
                        name: 'Vermelha', valid: 0, active: 1,
                    }
                ]
            }
            const response = await request(app)
                .post('/questions')
                .send(data)

            expect(response.statusCode).toEqual(403)
        })


        it('should update only question when no answers passed (answers are kept)', async () => {

            const data = {
                title: 'Qual a cor do universo?',
                description: '...hum',
                value: 2,
                active: 0,
            }
            const response = await request(app)
                .put('/questions/2')
                .send(data)
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)

        })

        it('should update question, remove old answers and add new', async () => {

            const data = {
                title: 'Qual a cor do universo?',
                description: '...hum',
                value: 66,
                active: 1,
                answers: [
                    {
                        name: 'Preto', valid: 1, active: 1,
                    },
                    {
                        name: 'Dark', valid: 0, active: 1,
                    }
                ]
            }
            const response = await request(app)
                .put('/questions/3')
                .send(data)
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)
            expect(response.body).toHaveProperty('id', 3)
            expect(response.body.answers[0]).toHaveProperty('name', 'Preto')
            expect(response.body.answers).toHaveLength(2)

        })

        it('should delete a question with no answers', async () => {

            const response = await request(app)
                .delete('/questions/7')
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(204)

        })

        it('should not delete a question with no answers', async () => {

            const response = await request(app)
                .delete('/questions/1')
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(400)

        })

    })
})
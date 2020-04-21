const connection = require('../../../../src/database')
const request = require('supertest')
const app = require('../../../../src/app')

let auth = {}

beforeAll(async () => {

    try {
        const data = {
            email: "le.bevilaqua@gmail.com",
            password: "123",
        }

        const response = await request(app)
            .post('/sec/login')
            .send(data)

        const { name, email, token } = response.body

        auth = {
            name,
            email,
            token
        }

    } catch (error) {
        console.log(error.message)
    }

})
afterAll(async () => {
    await connection.close()
})

describe('Validating Endpoints', () => {

    describe('Answer API', () => {

        it('should find all answers from question id', async () => {

            const response = await request(app)
                .get('/answers/1')
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)
            expect(response.body.length).toBeGreaterThan(0)

        })

        it('should create a answer', async () => {

            const data = {
                name: 'New Color',
                valid: 0,
                active: 1,
            }
            const response = await request(app)
                .post('/answers/1')
                .send(data)
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)
            expect(response.body).toHaveProperty('id')

        })

        it('should not create a answer cause there is one valid already', async () => {

            const data = {
                name: 'New Color Valid?',
                valid: 1,
                active: 1,
            }
            const response = await request(app)
                .post('/answers/1')
                .send(data)
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(400)
            expect(response.body).toHaveProperty('message')
        })


        it('should update a answer', async () => {

            const data = {
                name: 'New Color Green',
                valid: 0,
                active: 1,
            }

            const response = await request(app)
                .put('/answers/1/1')
                .send(data)
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)

        })

        it('should not update a answer cause there is more than one valid', async () => {

            const data = {
                name: 'New Color Blue',
                valid: 1,
                active: 1,
            }

            const response = await request(app)
                .put('/answers/2/5')
                .send(data)
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(400)

        })

        it('should delete a answer', async () => {

            const response = await request(app)
                .delete('/answers/5')
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(204)

        })

    })
})
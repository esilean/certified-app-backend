const connection = require('../../../../src/database')
const request = require('supertest')
const app = require('../../../../src/app')

let auth = {}

beforeAll(async () => {

})
afterAll(async () => {
    await connection.close()
})

describe('Validating Endpoints', () => {

    describe('User Auth API', () => {

        it('should login user in', async () => {

            const data = {
                email: "le.bevilaqua@gmail.com",
                password: "123"
            }

            const response = await request(app)
                .post('/sec/login')
                .send(data)

            expect(response.statusCode).toEqual(200)
            expect(response.body).toHaveProperty('name', 'email', 'token')

        })

        it('should not login user in', async () => {

            const data = {
                email: "le.bevilaqua@gmail.com",
                password: "xxxxx"
            }

            const response = await request(app)
                .post('/sec/login')
                .send(data)

            expect(response.statusCode).toEqual(400)

        })

        it('should create user', async () => {

            const data = {
                name: "Leandro",
                email: "refaglopes@gmail.com",
                password: "123",
                confirmPassword: "123"
            }

            const response = await request(app)
                .post('/sec/signup')
                .send(data)

            expect(response.statusCode).toEqual(200)
            expect(response.body).toHaveProperty('name', 'email', 'token')
            expect(response.body).toHaveProperty('email', 'refaglopes@gmail.com')

        })

        it('should not create user', async () => {

            const data = {
                name: "Leandro",
                email: "refaglopes@gmail.com",
                password: "123",
                confirmPassword: "123"
            }

            const response = await request(app)
                .post('/sec/signup')
                .send(data)

            expect(response.statusCode).toEqual(400)

        })






    })
})
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

    describe('Stage API', () => {

        it('should find all stages', async () => {

            const response = await request(app)
                .get('/stages/')
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)
            expect(response.body.length).toBeGreaterThan(1)

        })

        it('should find one stage', async () => {

            const response = await request(app)
                .get('/stages/1')
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)
            expect(response.body.id).toEqual(1)

        })


        it('should update a stage', async () => {

            const data = {
                name: 'the stage one',
                title_ini: 'the title',
                title_end: 'title congrats',
                title_end_fail: 'title fail',
                description_ini: 'ini',
                description_end: 'not fail',
                description_end_fail: 'fail',
                duration_min: 150,
                questions_qty: 2,
                grade_perc_min: 95,
                max_attempts: 10,
            }
            const response = await request(app)
                .put('/stages/1')
                .send(data)
                .set('Authorization', auth.token)

            expect(response.statusCode).toEqual(200)
            expect(response.body).toHaveProperty('id', 'title_ini', 'title_end', 'title_end_fail')
            expect(response.body.title_ini).toEqual('the title')
        })




    })
})
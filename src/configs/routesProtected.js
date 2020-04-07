const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
const auth = require('./auth')

const multer = require('multer')
const multerConfig = require('../configs/multer');

const CustomerController = require('../api/controllers/CustomerController')

const QuestionController = require('../api/controllers/QuestionController')
const QuestionImageController = require('../api/controllers/QuestionImageController')
const AnswerController = require('../api/controllers/AnswerController')

const StageController = require('../api/controllers/StageController')

const CustomerAttemptController = require('../api/controllers/CustomerAttemptController')
const CustomerAttemptQuestionController = require('../api/controllers/CustomerAttemptQuestionController')


module.exports = function (server) {

    const routes = Router()
    server.use(routes)

    // routes.use('/api-docs', swaggerUi.serve);
    // routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

    //add authentication to routes, need token to work
    routes.use(auth)


    /** CUSTOMER ATTEMPT QUESTIONS */
    /** CUSTOMER ATTEMPT QUESTIONS */
    /** CUSTOMER ATTEMPT QUESTIONS */
    routes.post('/customerattemptquestion/:customer_attempt_id/:question_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_attempt_id: Joi.number().required().min(1),
                question_id: Joi.number().required().min(1),
            }),
            [Segments.BODY]: Joi.object({
                order: Joi.number().required().min(1),
            }).unknown()
        }),
        CustomerAttemptQuestionController.store)
    routes.put('/customerattemptquestion/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
            [Segments.BODY]: Joi.object({
                answer_id: Joi.number().required().min(1),
            }).unknown()
        }),
        CustomerAttemptQuestionController.update)
    routes.delete('/customerattemptquestion/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        CustomerAttemptQuestionController.destroy)




    /** CUSTOMER ATTEMPT */
    /** CUSTOMER ATTEMPT */
    /** CUSTOMER ATTEMPT */
    routes.get('/customerattempt/:customer_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_id: Joi.number().required().min(1),
            }),
        }),
        CustomerAttemptController.index)
    routes.get('/customerattempt/:customer_id/:stage_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_id: Joi.number().required().min(1),
                stage_id: Joi.number().required().min(1).max(4),
            }),
        }),
        CustomerAttemptController.indexStage)
    routes.post('/customerattempt/:customer_id/:stage_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_id: Joi.number().required().min(1),
                stage_id: Joi.number().required().min(1).max(4),
            }),
            [Segments.BODY]: Joi.object().keys({
                date_ini: Joi.date().required(),
            })
        }),
        CustomerAttemptController.store)
    routes.put('/customerattempt/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
            [Segments.BODY]: Joi.object().keys({
                date_end: Joi.date().required(),
                approved: Joi.number().min(0).max(1),
            })
        }),
        CustomerAttemptController.update)
    routes.delete('/customerattempt/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        CustomerAttemptController.destroy)




    /** STAGES */
    /** STAGES */
    /** STAGES */
    routes.get('/stages', StageController.index)


    /** ANSWERS */
    /** ANSWERS */
    /** ANSWERS */
    routes.get('/answers/:question_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                question_id: Joi.number().required().min(1),
            }),
        }),
        AnswerController.index)
    routes.post('/answers/:question_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                question_id: Joi.number().required().min(1),
            }),
            [Segments.BODY]: Joi.object({
                name: Joi.string().required().max(250),
                valid: Joi.number().min(0).max(1),
                active: Joi.number().min(0).max(1),
            }).unknown()
        }),
        AnswerController.store)
    routes.put('/answers/:question_id/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                question_id: Joi.number().required().min(1),
                id: Joi.number().required().min(1),
            }),
            [Segments.BODY]: Joi.object({
                name: Joi.string().required().max(250),
                valid: Joi.number().min(0).max(1),
                active: Joi.number().min(0).max(1),
            }).unknown()
        }),
        AnswerController.update)
    routes.delete('/answers/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        AnswerController.destroy)


    /** QUESTIONS */
    /** QUESTIONS */
    /** QUESTIONS */

    routes.post('/questions/img/:id', multer(multerConfig).single('file'), QuestionImageController.store)
    routes.delete('/questions/img/:id', QuestionImageController.destroyImgFromStorage, QuestionImageController.destroy)

    routes.get('/questions', QuestionController.index)
    routes.post('/questions',
        celebrate({
            [Segments.BODY]: Joi.object({
                title: Joi.string().required().max(1000),
                value: Joi.number().min(1),
                active: Joi.number().min(0).max(1),
            }).unknown()
        }),
        QuestionController.store)
    routes.put('/questions/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
            [Segments.BODY]: Joi.object({
                title: Joi.string().required().max(1000),
                value: Joi.number().min(1),
                active: Joi.number().min(0).max(1),
            }).unknown()
        }),
        QuestionController.update)
    routes.delete('/questions/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        QuestionController.destroy)

    /** CUSTOMERS */
    /** CUSTOMERS */
    /** CUSTOMERS */
    routes.get('/customers', CustomerController.index)
    routes.post('/customers',
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required().max(250),
                email: Joi.string().required().max(100),
                active: Joi.number().min(0).max(1),
            })
        }),
        CustomerController.store)
    routes.put('/customers/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required().max(250),
                email: Joi.string().required().max(100),
                active: Joi.number().min(0).max(1),
            })
        }),
        CustomerController.update)
    routes.delete('/customers/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        CustomerController.destroy)


}
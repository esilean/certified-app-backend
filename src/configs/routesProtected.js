const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
const auth = require('./auth')

const multer = require('multer')
const multerConfig = require('../configs/multer');

const CustomerController = require('../api/controllers/CustomerController')
const CustomerEmailController = require('../api/controllers/CustomerEmailController')

const QuestionController = require('../api/controllers/QuestionController')
const QuestionImageController = require('../api/controllers/QuestionImageController')
const AnswerController = require('../api/controllers/AnswerController')

const StageController = require('../api/controllers/StageController')

const CustomerStageController = require('../api/controllers/CustomerStageController')
const CustomerStageOneController = require('../api/controllers/CustomerStageOneController')


module.exports = function (server) {

    const routes = Router()
    server.use(routes)

    // routes.use('/api-docs', swaggerUi.serve);
    // routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

    //add authentication to routes, need token to work
    routes.use(auth)


    /** CUSTOMER STAGE ONES */
    /** CUSTOMER STAGE ONES */
    /** CUSTOMER STAGE ONES */
    routes.get('/customerstageone/:customer_stage_id/:order',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_stage_id: Joi.number().required().min(1),
                order: Joi.number().required().min(1),
            }),
        }),
        CustomerStageOneController.findByCustomerIdAndOrder)
    routes.post('/customerstageone/:customer_stage_id/:question_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_stage_id: Joi.number().required().min(1),
                question_id: Joi.number().required().min(1),
            }),
            [Segments.BODY]: Joi.object({
                order: Joi.number().required().min(1),
            }).unknown()
        }),
        CustomerStageOneController.store)
    routes.put('/customerstageone/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
            [Segments.BODY]: Joi.object({
                answer_id: Joi.number().required().min(1),
                value: Joi.number().required().min(1),
            }).unknown()
        }),
        CustomerStageOneController.update)
    routes.delete('/customerstageone/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        CustomerStageOneController.destroy)




    /** CUSTOMER STAGE */
    /** CUSTOMER STAGE */
    /** CUSTOMER STAGE */
    routes.get('/customerstage/:id/result',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        CustomerStageController.result)    
    routes.get('/customerstage/:customer_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_id: Joi.string().required().min(36).max(36),
            }),
        }),
        CustomerStageController.index)
    routes.get('/customerstage/:customer_id/:stage_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_id: Joi.string().required().min(36).max(36),
                stage_id: Joi.number().required().min(1).max(4),
            }),
        }),
        CustomerStageController.findCurrentStage)
    routes.post('/customerstage/:customer_id/:stage_id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_id: Joi.string().required().min(36).max(36),
                stage_id: Joi.number().required().min(1).max(4),
            }),
            [Segments.BODY]: Joi.object().keys({
                questions_qty: Joi.number().required().min(0),
                duration_min: Joi.number().required().min(1),
                grade_perc_min: Joi.number().required().min(0),
            })
        }),
        CustomerStageController.store)
    routes.put('/customerstage/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        CustomerStageController.update)
    routes.delete('/customerstage/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        CustomerStageController.destroy)

    /** STAGES */
    /** STAGES */
    /** STAGES */
    routes.get('/stages', StageController.index)
    routes.get('/stages/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1).max(4),
            }),
        }),
        StageController.index)
    routes.put('/stages/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1).max(4),
            }),
            [Segments.BODY]: Joi.object({
                name: Joi.string().required().max(55),
                title_ini: Joi.string().required().max(150),
                title_end: Joi.string().required().max(150),
                title_end_fail: Joi.string().required().max(150),
                description_ini: Joi.string().required().max(4000),
                description_end: Joi.string().required().max(4000),
                description_end_fail: Joi.string().required().max(4000),
                duration_min: Joi.number().required().min(1),
                questions_qty: Joi.number().required().min(0),
                grade_perc_min: Joi.number().required().min(0),
                max_attempts: Joi.number().required().min(1),
            }).unknown()
        }),
        StageController.update)


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

    routes.post('/questions/img/:id', multer(multerConfig).single('file'), QuestionImageController.resizeImage, QuestionImageController.store)
    routes.delete('/questions/img/:id', QuestionImageController.destroyImgFromStorage, QuestionImageController.destroy)

    routes.get('/questions', QuestionController.index)
    routes.get('/questions/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required().min(1),
            }),
        }),
        QuestionController.index)
    routes.post('/questions',
        celebrate({
            [Segments.BODY]: Joi.object({
                title: Joi.string().required().max(1000),
                value: Joi.number().min(1),
                active: Joi.number().min(0).max(1),
                answers: Joi.array().required().min(1),
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

    routes.get('/customers/:customer_id/email',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                customer_id: Joi.string().required().min(36).max(36),
            }),
        }),
        CustomerEmailController.index)

    routes.get('/customers', CustomerController.index)
    routes.get('/customers/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.string().required().min(36).max(36),
            }),
        }),
        CustomerController.index)
    routes.put('/customers/:id',
        celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.string().required().min(36).max(36),
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
                id: Joi.string().required().min(36).max(36),
            }),
        }),
        CustomerController.destroy)


}
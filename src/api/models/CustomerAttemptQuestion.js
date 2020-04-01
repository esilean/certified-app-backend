const { Model, DataTypes } = require('sequelize');

class CustomerAttemptQuestion extends Model {
    static init(connection) {
        super.init({
            order: DataTypes.INTEGER,
        }, {
            sequelize: connection,
            tableName: 'CustomerAttemptQuestions'
        })
    }

    static associate(models) {
        this.belongsTo(models.CustomerAttempt, {
            foreignKey: 'customer_attempt_id', as: 'customerAttempt',
        })
        this.belongsTo(models.Question, {
            foreignKey: 'question_id', as: 'question',
        })
        this.belongsTo(models.Answer, {
            foreignKey: 'answer_id', as: 'answer',
        })
    }

}

module.exports = CustomerAttemptQuestion
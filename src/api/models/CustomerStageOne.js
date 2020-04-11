const { Model, DataTypes } = require('sequelize');

class CustomerStageOne extends Model {
    static init(connection) {
        super.init({
            value: DataTypes.INTEGER,
            order: DataTypes.INTEGER,
        }, {
            sequelize: connection,
            tableName: 'CustomerStageOnes'
        })
    }

    static associate(models) {
        this.belongsTo(models.CustomerStage, {
            foreignKey: 'customer_stage_id', as: 'customerStages',
        })
        this.belongsTo(models.Question, {
            foreignKey: 'question_id', as: 'questions',
        })
        this.belongsTo(models.Answer, {
            foreignKey: 'answer_id', as: 'answers',
        })
    }

}

module.exports = CustomerStageOne
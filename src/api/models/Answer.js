const { Model, DataTypes } = require('sequelize');

class Answer extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            valid: DataTypes.BOOLEAN,
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: connection,
            tableName: 'Answers'
        })
    }

    static associate(models) {
        this.belongsTo(models.Question, {
            foreignKey: 'question_id', as: 'question',
        })
    }

}

module.exports = Answer
const { Model, DataTypes } = require('sequelize');

class Answer extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
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
            foreignKey: 'question_id', as: 'questions',
        })
    }

}

module.exports = Answer
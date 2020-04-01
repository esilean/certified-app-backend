const { Model, DataTypes } = require('sequelize');

class Question extends Model {
    static init(connection) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            image_url: DataTypes.STRING,
            value: DataTypes.INTEGER,
            active: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            tableName: 'Questions'
        })
    }

    static associate(models) {
        this.hasMany(models.Answer, { foreignKey: 'question_id', as: 'answers' })
    }    

}

module.exports = Question
const { Model, DataTypes } = require('sequelize');

class Question extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            value: DataTypes.INTEGER,
            image_url: DataTypes.STRING,
            image_name: DataTypes.STRING,
            image_key: DataTypes.STRING,
            image_size: DataTypes.INTEGER,
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: connection,
            tableName: 'Questions'
        })
    }

    static associate(models) {
        this.hasMany(models.Answer, { foreignKey: 'question_id', as: 'answers' })
        this.hasMany(models.CustomerStageOne, { foreignKey: 'question_id', as: 'customerStageOnes' })
    }

}

module.exports = Question
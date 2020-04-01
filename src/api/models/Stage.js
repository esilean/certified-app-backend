const { Model, DataTypes } = require('sequelize');

class Stage extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            tableName: 'Stages'
        })
    }

    static associate(models) {
        this.hasMany(models.CustomerAttempt, { foreignKey: 'stage_id', as: 'stages' })
    }       

}

module.exports = Stage
const { Model, DataTypes } = require('sequelize');

class CustomerAttempt extends Model {
    static init(connection) {
        super.init({
            date_ini: DataTypes.DATE,
            date_end: DataTypes.DATE,
            approved: DataTypes.STRING,
        }, {
            sequelize: connection,
            tableName: 'CustomerAttempts'
        })
    }

    static associate(models) {
        this.belongsTo(models.Customer, {
            foreignKey: 'customer_id', as: 'customer',
        })
        this.belongsTo(models.Stage, {
            foreignKey: 'stage_id', as: 'stage',
        })

        this.hasMany(models.CustomerAttemptQuestion, { foreignKey: 'customer_attempt_id', as: 'customerAttempts' })     
    }      

}

module.exports = CustomerAttempt
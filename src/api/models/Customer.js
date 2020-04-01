const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
    static init(connection) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            cpf: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        }, {
            sequelize: connection,
            tableName: 'Customers'
        })
    }

    static associate(models) {
        this.hasMany(models.CustomerAttempt, { foreignKey: 'customer_id', as: 'customers' })
    }      

}

module.exports = Customer
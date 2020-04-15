const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.CHAR(36),
                primaryKey: true,
            },
            name: DataTypes.STRING(250),
            password: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            access_token: {
                type: DataTypes.STRING(100),
                unique: true,
                allowNull: true,
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
        }, {
            sequelize: connection,
            tableName: 'Customers'
        })
    }

    static associate(models) {
        this.hasMany(models.CustomerStage, { foreignKey: 'customer_id', as: 'customerStages' })
        this.hasMany(models.CustomerEmail, { foreignKey: 'customer_id', as: 'customerEmails' })
    }

}

module.exports = Customer
const { Model, DataTypes } = require('sequelize');

class Customer extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
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
    }

}

module.exports = Customer
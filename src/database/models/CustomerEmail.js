const { Model, DataTypes } = require('sequelize');

class CustomerEmail extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.CHAR(36),
                primaryKey: true,
            },
            email_from: DataTypes.STRING(75),
            email_to: DataTypes.STRING(1000),
            email_body: DataTypes.STRING(1000),
            subject: DataTypes.STRING(250),
            messageId: DataTypes.STRING(100),
            error: DataTypes.STRING(1000),

        }, {
            sequelize: connection,
            tableName: 'CustomerEmails'
        })
    }

    static associate(models) {
        this.belongsTo(models.Question, {
            foreignKey: 'customer_id', as: 'customer',
        })
    }

}

module.exports = CustomerEmail
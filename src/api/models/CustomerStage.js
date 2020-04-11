const { Model, DataTypes } = require('sequelize');

class CustomerStage extends Model {
    static init(connection) {
        super.init({
            date_ini: DataTypes.DATE,
            date_end: DataTypes.DATE,
            approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },            
        }, {
            sequelize: connection,
            tableName: 'CustomerStages'
        })
    }

    static associate(models) {
        this.belongsTo(models.Customer, {
            foreignKey: 'customer_id', as: 'customers',
        })
        this.belongsTo(models.Stage, {
            foreignKey: 'stage_id', as: 'stages',
        })

        this.hasMany(models.CustomerStageOne, { foreignKey: 'customer_stage_id', as: 'customerStageOnes' })     
    }      

}

module.exports = CustomerStage
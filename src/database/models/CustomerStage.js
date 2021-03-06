const { Model, DataTypes } = require('sequelize');

class CustomerStage extends Model {
    static init(connection) {
        super.init({
            date_ini: DataTypes.DATE,
            date_end: DataTypes.DATE,
            questions_qty: DataTypes.INTEGER,
            duration_min: DataTypes.INTEGER,
            grade_perc_min: DataTypes.DOUBLE,
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
            foreignKey: 'customer_id', as: 'customer',
        })
        this.belongsTo(models.Stage, {
            foreignKey: 'stage_id', as: 'stage',
        })

        this.hasMany(models.CustomerStageOne, { foreignKey: 'customer_stage_id', as: 'customerStageOnes' })     
    }      

}

module.exports = CustomerStage
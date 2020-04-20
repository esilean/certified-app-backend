const { Model, DataTypes } = require('sequelize');

class Stage extends Model {
    static init(connection) {
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            title_ini: DataTypes.STRING,
            description_ini: DataTypes.STRING,
            video_url_ini: DataTypes.STRING,

            title_end: DataTypes.STRING,
            description_end: DataTypes.STRING,
            video_url_end: DataTypes.STRING,

            title_end_fail: DataTypes.STRING,
            description_end_fail: DataTypes.STRING,
            video_url_end_fail: DataTypes.STRING,            

            duration_min: DataTypes.INTEGER,
            questions_qty: DataTypes.INTEGER,
            grade_perc_min: DataTypes.DOUBLE,
            max_attempts: DataTypes.INTEGER,
        }, {
            sequelize: connection,
            tableName: 'Stages'
        })
    }

    static associate(models) {
        this.hasMany(models.CustomerStage, { foreignKey: 'stage_id', as: 'stages' })
    }

}

module.exports = Stage
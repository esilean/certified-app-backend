module.exports = {
    host: '127.0.0.1',
    dialect: 'mysql',
    database: 'certifiedce-test',
    username: 'root',
    password: '123456',
    logging: false,
    authentication: {
        type: 'default',
        options: {
            userName: 'root',
            password: '123456'
        }
    },
    options: {
        database: 'certifiedce-test',
        rowCollectionOnDone: true,
        useColumnNames: false,
        encrypt: false,
    },
    define: {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
    }
};
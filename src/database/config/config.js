
module.exports =
{
  "development": {
    "username": "root",
    "password": "123456",
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      "timestamps": true,
      "underscored": true,
      "freezeTableName": true
    }
  },
  "test": {
    "username": "root",
    "password": ((process.env.ENVIRONMENT === 'test') ? "" : "123456"),
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": true,
    "define": {
      "timestamps": true,
      "underscored": true,
      "freezeTableName": true
    }
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
    "define": {
      "timestamps": true,
      "underscored": true,
      "freezeTableName": true
    }
  }
}
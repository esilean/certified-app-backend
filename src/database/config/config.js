module.exports =
{
  "dev": {
    "username": "root",
    "password": "",
    "database": "certifiedbev",
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
    "password": "",
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
    "define": {
      "timestamps": true,
      "underscored": true,
      "freezeTableName": true
    }
  },
  "production": {
    "dialect": "mysql",
    "logging": true,
    "define": {
      "timestamps": true,
      "underscored": true,
      "freezeTableName": true
    }
  }
}
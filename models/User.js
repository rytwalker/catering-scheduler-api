const database = require('../db/dbConfig.js');
const bcrypt = require('bcryptjs');

class User {
  constructor(user) {
    this.user = user;
  }

  static getAllUsers() {
    return database('users');
  }

  static getUserById(_id) {
    return database('users')
      .where({ _id: _id })
      .first();
  }
  static getUserByEmail(email) {
    return database('users')
      .where({ email })
      .first();
  }

  save() {
    return database('users').insert(this.user, 'email');
  }
}

module.exports = User;

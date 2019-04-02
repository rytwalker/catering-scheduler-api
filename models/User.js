const database = require('../db/dbConfig.js');
const bcrypt = require('bcryptjs');

class User {
  constructor(user) {
    this.user = user;
  }

  static getAllUsers() {
    return database('users');
  }

  static async getUserByEmail(email) {
    // return database('users')
    //   .where({ email })
    //   .first();
    try {
      const user = await database('users')
        .where({ email })
        .first();
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  static exists(email) {
    // this.getUserByEmail(email)
    //   .then(user => {
    //     return user;
    //   })
    //   .catch(err => console.log(err));
  }

  save() {
    return database('users').insert(this.user, 'email');
  }
}

// User.getAllUsers()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// User.getUserByEmail('Lynne@gmail.com')
//   .then(res => {
//     if (res) {
//       console.log(res);
//     }
//   })
//   .catch(err => console.log(err));

// const new_user = await User.getUserByEmail('Lynne@gmail.com');

// const exists = await User.exists('Lynne@gmail.com');
// console.log(exists);

// const hash = bcrypt.hashSync('testing123', 12);
// const user = new User({
//   email: 'Mary@gmail.com',
//   password: hash,
//   first_name: 'Mary',
//   last_name: 'Jones',
//   phone_number: '330-540-1134'
// });

// user
//   .save()
//   .then(res => {
//     User.getUserByEmail(res[0])
//       .then(result => console.log(result))
//       .catch(err => console.log(err));
//   })
//   .catch(err => err);

module.exports = User;

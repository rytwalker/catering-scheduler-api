const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports = {
  createUser: async args => {
    const prevUser = await User.getUserByEmail(args.userInput.email);

    if (prevUser) {
      throw new Error('User exists already.');
    }

    const hash = bcrypt.hashSync(args.userInput.password, 12);
    const user = new User({
      email: args.userInput.email,
      password: hash,
      first_name: args.userInput.first_name,
      last_name: args.userInput.last_name,
      phone_number: args.userInput.phone_number
    });

    try {
      const [newUserEmail] = await user.save();
      const newUser = await User.getUserByEmail(newUserEmail);
      return { ...newUser, password: null };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const user = await User.getUserByEmail(email);
    if (!user) {
      throw new Error('User does not exist');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect');
    }
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      'thisisakeyladdadfafdef',
      {
        expiresIn: '1h'
      }
    );
    return { user_id: user._id, token: token, tokenExpiration: 1 };
  }
};

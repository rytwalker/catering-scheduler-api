const User = require('../../models/User');

const getUser = async userId => {
  try {
    const foundUser = await User.getUserById(userId);
    return { ...foundUser, password: null };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getUser = getUser;

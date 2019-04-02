const bcrypt = require('bcryptjs');
const Event = require('../../models/Event');
const User = require('../../models/User');

module.exports = {
  events: async () => {
    const events = await Event.getAllEvents();
    return events;
  },
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      number_of_guests: args.eventInput.number_of_guests,
      location: args.eventInput.location,
      price: +args.eventInput.price,
      date: args.eventInput.date,
      start_time: args.eventInput.start_time,
      end_time: args.eventInput.end_time,
      user_id: args.eventInput.user_id
    });
    try {
      const [id] = await event.save();
      const newEvent = await Event.getEventById(id);
      return newEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
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
  }
};

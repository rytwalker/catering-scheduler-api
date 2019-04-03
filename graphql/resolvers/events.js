const Event = require('../../models/Event');
const { getUser } = require('./helpers');

module.exports = {
  events: async () => {
    try {
      const events = await Event.getAllEvents();
      return events.map(event => {
        return {
          ...event,
          user: getUser.bind(this, parseInt(event.user_id))
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unautheticated');
    }
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
  }
};

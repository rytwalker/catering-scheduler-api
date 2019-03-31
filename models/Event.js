const database = require('../db/dbConfig.js');

/*
    The Event class takes in an event object that looks like this:
    title: String!
    number_of_guests: Int!
    location: String!
    price: Float!
    date: String!
    start_time: String!
    end_time: String!
*/

class Event {
  constructor(event) {
    this.new_event = event;
    this.title = event.title;
    this.number_of_guests = event.number_of_guests;
    this.location = event.location;
    this.price = event.price;
    this.date = event.date;
    this.start_time = event.start_time;
    this.end_time = event.end_time;
  }

  static getAllEvents() {
    return database('events');
  }

  async save(new_event) {
    try {
      const id = await db('events').insert(new_event, '_id');
      return id;
    } catch (error) {
      console.log(error);
    }
  }
}

const newEvent = new Event({
  title: 'Salem Volleyball Banquet',
  number_of_guests: 100,
  location: 'Salem High School 1200 E 6th Street, Salem OH 44460',
  price: 410.8,
  date: '2019-05-12',
  start_time: '7:00',
  end_time: '10:00'
});

module.exports = Event;

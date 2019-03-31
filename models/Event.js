const database = require('../db/dbConfig.js');

class Event {
  constructor(event) {
    this.event = event;
  }

  static getAllEvents() {
    return database('events');
  }

  static getEventById(_id) {
    return database('events')
      .where({ _id })
      .first();
  }

  save() {
    return database('events').insert(this.event, '_id');
  }
}

// const newEvent = new Event({
//   title: 'Salem Volleyball Banquet',
//   number_of_guests: 100,
//   location: 'Salem High School 1200 E 6th Street, Salem OH 44460',
//   price: 410.8,
//   date: '2019-05-12',
//   start_time: '7:00',
//   end_time: '10:00'
// });

// Event.getAllEvents()
//   .then(res => console.log({ ...res }))
//   .catch(err => console.log(err));

module.exports = Event;

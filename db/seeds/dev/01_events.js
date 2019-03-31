exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('events').insert([
        {
          title: "Gina's Graduation Party",
          number_of_guests: 200,
          location: 'Bears Den Cabin New Cross Dr, Youngstown, OH 44501',
          price: 500.45,
          date: '2019-06-31T17:24:29.658Z'
        },
        {
          title: 'Kelly and Mike Wedding Reception',
          number_of_guests: 125,
          location:
            'Double Tree by Hilton Youngstown Downtown 44 East Federal Plaza, Youngstown, Ohio 44503',
          price: 700.45,
          date: '2019-07-11T17:24:29.658Z'
        },
        {
          title: 'Salem Volleyball Banquet',
          number_of_guests: 100,
          location: 'Salem High School 1200 E 6th Street, Salem OH 44460',
          price: 410.8,
          date: '2019-05-12T17:24:29.658Z'
        }
      ]);
    });
};

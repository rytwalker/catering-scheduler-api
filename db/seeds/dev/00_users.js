exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          _id: 1,
          email: 'ryan@gmail.com',
          first_name: 'Ryan',
          last_name: 'Walker',
          phone_number: '330-540-1036'
        },
        {
          _id: 2,
          email: 'nathan@gmail.com',
          first_name: 'Nathan',
          last_name: 'Harris',
          phone_number: '330-555-5555'
        },
        {
          _id: 3,
          email: 'hank@gmail.com',
          first_name: 'Hank',
          last_name: 'Brock',
          phone_number: '330-444-4444'
        }
      ]);
    });
};

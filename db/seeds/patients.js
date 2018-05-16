const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patients').del()
    .then(function () {
      return Promise.all([
        knex('patients').insert({
          public_address: 'patient1',
          email: '1234@gmail.com',
          username: 'Mareli Brooks',
          password: bcrypt.hashSync('drugs99', 10)
        }),
        knex('patients').insert({
          public_address: 'patient2',
          email: '1235@gmail.com',
          username: 'Clayton Chavez',
          password: bcrypt.hashSync('drugs991', 10)
        }),
        knex('patients').insert({
          public_address: 'patient3',
          email: '1236@gmail.com',
          username: 'Trevin Zavala',
          password: bcrypt.hashSync('drugs992', 10)
        }),
        knex('patients').insert({
          public_address: 'patient4',
          email: '1237@gmail.com',
          username: 'Taylor Shea',
          password: bcrypt.hashSync('drugs993', 10)
        }),
        knex('patients').insert({
          public_address: 'patient5',
          email: '1238@gmail.com',
          username: 'Asia Walters',
          password: bcrypt.hashSync('drugs994', 10)
        }),
       ]);
    });
};

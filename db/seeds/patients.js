const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patients').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('patients').insert(
          {public_address: '0x0000000000000000000000000000000000000002',
          email: 'drugster@gmail.com',
          name: 'D. Rugster',
          address: '99 Maybe Lane',
          city: 'Tornado, Land',
          postal_code: '102302',
          password: bcrypt.hashSync('drugs99', 10)}
        )
       ]);
    });
};

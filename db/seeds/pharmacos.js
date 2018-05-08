const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pharmacos').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('pharmacos').insert(
          {public_address: '0x0000000000000000000000000000000000000003',
          company_name: 'We Make Drugs',
          contact_name: 'Harvey Pharmster',
          email: 'hpharmster@gmail.com',
          address: '312 S Dearborn St.',
          city: 'Chicago, IL',
          postal_code: '60604',
          password: bcrypt.hashSync('drugs666', 10)}
        )
       ]);
    });
};

const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pharmacos').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('pharmacos').insert({
          public_address: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B',
          company_name: 'We Make Drugs',
          contact_name: 'Harvey Pharmster',
          email: 'hpharmster@gmail.com',
          password: bcrypt.hashSync('drugs666', 10)
        }),
        knex('pharmacos').insert({
          public_address: '0x04C8559326Cd7649424708F85D45f8F924CC5b74',
          company_name: 'We Also Make Drugs',
          contact_name: 'Pharmy Harmster',
          email: 'phharmster@gmail.com',
          password: bcrypt.hashSync('drugs6669', 10)
        }),
        knex('pharmacos').insert({
          public_address: '0xD00c9661221a448c3D6B97b968363be5A330d722',
          company_name: 'We Sometimes Make Drugs',
          contact_name: 'Bill Gurd',
          email: 'bgurd@gmail.com',
          password: bcrypt.hashSync('drugs6660', 10)
        }),
       ]);
    });
};

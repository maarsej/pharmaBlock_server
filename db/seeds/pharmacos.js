const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pharmacos').del()
  .then(function () {
    return Promise.all([
      // Inserts seed entries
      knex('pharmacos').insert({
        public_address: 'pharm1',
        company_name: 'GRIFOLS USA, LLC',
        contact_name: "Veradis Pinnijar",
        email: '4560@gmail.com',
        password: bcrypt.hashSync('drugs6660', 10)
      }),
      knex('pharmacos').insert({
        public_address: 'pharm2',
        company_name: 'Physicians Total Care, Inc.',
        contact_name: "Dore Antonov",
        email: '4561@gmail.com',
        password: bcrypt.hashSync('drugs6661', 10)
      }),
      knex('pharmacos').insert({
        public_address: 'pharm3',
        company_name: 'AvPAK',
        contact_name: "Giuditta Rottger",
        email: '4562@gmail.com',
        password: bcrypt.hashSync('drugs6662', 10)
      }),
      knex('pharmacos').insert({
        public_address: 'pharm4',
        company_name: 'Proficient Rx',
        contact_name: "Giuditta Rottger",
        email: '4563@gmail.com',
        password: bcrypt.hashSync('drugs6663', 10)
      }),
      knex('pharmacos').insert({
        public_address: 'pharm5',
        company_name: 'Best Choice (Valu Merchandisers Company)',
        contact_name: "Giuditta Rottger",
        email: '4564@gmail.com',
        password: bcrypt.hashSync('drugs6664', 10)
      })
      ]);
  });
};
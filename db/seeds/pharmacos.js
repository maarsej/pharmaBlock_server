const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pharmacos').del()
  .then(function () {
    return Promise.all([
      // Inserts seed entries
      knex('pharmacos').insert({
        public_address: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B',
        company_name: 'GRIFOLS USA, LLC',
        contact_name: "Veradis Pinnijar",
        email: '4560@gmail.com',
        password: bcrypt.hashSync('drugs6660', 10)
      }),
      knex('pharmacos').insert({
        public_address: '0x04C8559326Cd7649424708F85D45f8F924CC5b74',
        company_name: 'Physicians Total Care, Inc.',
        contact_name: "Dore Antonov",
        email: '4561@gmail.com',
        password: bcrypt.hashSync('drugs6661', 10)
      }),
      knex('pharmacos').insert({
        public_address: '0xD00c9661221a448c3D6B97b968363be5A330d722',
        company_name: 'AvPAK',
        contact_name: "Giuditta Rottger",
        email: '4562@gmail.com',
        password: bcrypt.hashSync('drugs6662', 10)
      }),
      knex('pharmacos').insert({
        public_address: '0xDB27926A76E7f64a25fD3dEF304E5141de09Fe1f',
        company_name: 'Proficient Rx',
        contact_name: "Giuditta Rottger",
        email: '4563@gmail.com',
        password: bcrypt.hashSync('drugs6663', 10)
      }),
      knex('pharmacos').insert({
        public_address: '0xBC56119401f146F5eb3852C2618207349b321062',
        company_name: 'Best Choice (Valu Merchandisers Company)',
        contact_name: "Giuditta Rottger",
        email: '4564@gmail.com',
        password: bcrypt.hashSync('drugs6664', 10)
      })
      ]);
  });
};
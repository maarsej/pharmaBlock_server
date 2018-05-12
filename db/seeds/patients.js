const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patients').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('patients').insert({
          public_address: '0xBb16559B164e4f0B872caAA640Dc1CCbf1f3E8b2', email: '1234@gmail.com', username: 'Mareli Brooks', password: bcrypt.hashSync('drugs99', 10)
        }),
        knex('patients').insert({
          public_address: '0xa273e1C1Bd3FBC09b5274B2a2319193cd7298873', email: '1235@gmail.com', username: 'Clayton Chavez', password: bcrypt.hashSync('drugs991', 10)
        }),
        knex('patients').insert({
          public_address: '0x6268c4b8490beA0880c6CC7fFFB8362c2D3B5Ff4', email: '1236@gmail.com', username: 'Trevin Zavala', password: bcrypt.hashSync('drugs992', 10)
        }),
        knex('patients').insert({
          public_address: '0xe511708661CfAE7ae3C8Ae69810369cBA37BcE6b', email: '1237@gmail.com', username: 'Taylor Shea', password: bcrypt.hashSync('drugs993', 10)
        }),
        knex('patients').insert({
          public_address: '0xB3AA28edf71914e0d92f56B27d5340446Bbd0b59', email: '1238@gmail.com', username: 'Asia Walters', password: bcrypt.hashSync('drugs994', 10)
        }),
       ]);
    });
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('generic_drugs').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('generic_drugs').insert({
          id: 1,
          name: 'bonadrogo',
          description: 'A really safe and efficacious drug.'
        }),
        knex('generic_drugs').insert({
          id: 2,
          name: 'malbonadrogo',
          description: 'A really dangerous and useless drug.'
        }),
        knex('generic_drugs').insert({
          id: 3,
          name: 'bongustadrogo',
          description: 'A drug you love to take.'
        })
       ]);
    });
};


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drugs').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('drugs').insert({
          pharmaco_address: '0x0000000000000000000000000000000000000003',
          brand_name: 'Good Drug',
          generic_name: 'bonadrogo',
          price_per_mg: 2,
          description: 'A really safe and efficacious drug.',
          image_url: 'capsule.png',
          flag: 1
        }),
        knex('drugs').insert({
          pharmaco_address: '0x0000000000000000000000000000000000000003',
          brand_name: 'Bad Drug',
          generic_name: 'malbonadrogo',
          price_per_mg: 100,
          description: 'A really dangerous and useless drug.',
          image_url: 'capsule.png',
          flag: 0
        }),
        knex('drugs').insert({
          pharmaco_address: '0x0000000000000000000000000000000000000009',
          brand_name: 'Tasty Drug',
          generic_name: 'bongustadrogo',
          price_per_mg: 1,
          description: 'A drug you love to take.',
          image_url: 'gumimaci.jpg',
          flag: 1}
         )
       ]);
    });
};

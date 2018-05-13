
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drugs').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('drugs').insert({
          pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B',
          brand_name: 'Good Drug',
          generic_name: 'bonadrogo',
          generic_id: 1,
          price_per_mg: 2,
          description: 'A really safe and efficacious drug.',
          image_url: 'capsule.png',
          flag: 1
        }),
        knex('drugs').insert({
          pharmaco_pubaddr: '0x04C8559326Cd7649424708F85D45f8F924CC5b74',
          brand_name: 'Bad Drug',
          generic_name: 'malbonadrogo',
          generic_id: 2,
          price_per_mg: 100,
          description: 'A really dangerous and useless drug.',
          image_url: 'capsule.png',
          flag: 0
        }),
        knex('drugs').insert({
          pharmaco_pubaddr: '0xD00c9661221a448c3D6B97b968363be5A330d722',
          brand_name: 'Tasty Drug',
          generic_name: 'bongustadrogo',
          generic_id: 3,
          price_per_mg: 1,
          description: 'A drug you love to take.',
          image_url: 'gumimaci.jpg',
          flag: 1
        })
       ]);
    });
};

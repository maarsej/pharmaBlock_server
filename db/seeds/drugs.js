
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drugs').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('drugs').insert({
          id: 1,
          pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B',
          brand_name: 'Good Drug',
          price_per_mg: 2,
          image_url: 'capsule.png',
          generic_id: 1,
          flag: 1
        }),
        knex('drugs').insert({
          id: 2,
          pharmaco_pubaddr: '0x04C8559326Cd7649424708F85D45f8F924CC5b74',
          brand_name: 'Nice Drug',
          price_per_mg: 3,
          image_url: 'capsule.png',
          generic_id: 1,
          flag: 1
        }),
        knex('drugs').insert({
          id: 3,
          pharmaco_pubaddr: '0x04C8559326Cd7649424708F85D45f8F924CC5b74',
          brand_name: 'Bad Drug',
          price_per_mg: 100,
          image_url: 'capsule.png',
          generic_id: 2,
          flag: 0
        }),
        knex('drugs').insert({
          id: 4,
          pharmaco_pubaddr: '0xD00c9661221a448c3D6B97b968363be5A330d722',
          brand_name: 'Tasty Drug',
          price_per_mg: 1,
          image_url: 'gumimaci.jpg',
          generic_id: 3,
          flag: 1
        })
       ]);
    });
};

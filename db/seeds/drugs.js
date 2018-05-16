
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drugs').del()
  .then(function () {
    return Promise.all([
      knex('drugs').insert({
        id: 1,
        pharmaco_pubaddr: 5,
        brand_name: 'Dactinidine',
        price_per_mg: 2,
        image_url: null,
        generic_id: 6
      }),
      knex('drugs').insert({
        id: 2,
        pharmaco_pubaddr: 4,
        brand_name: 'Lexibicin',
        price_per_mg: 1,
        image_url: null,
        generic_id: 6
      }),
      knex('drugs').insert({
        id: 3,
        pharmaco_pubaddr: 5,
        brand_name: 'Diproletra',
        image_url: null,
        generic_id: 6
      }),
      knex('drugs').insert({
        id: 4,
        pharmaco_pubaddr: 4,
        brand_name: 'Fosinostryl',
        price_per_mg: 1,
        price_per_mg: 3,
        image_url: null,
        generic_id: 6
      }),
      knex('drugs').insert({
        id: 5,
        pharmaco_pubaddr: 3,
        brand_name: 'Dactinidine',
        price_per_mg: 2,
        image_url: null,
        generic_id: 6
      }),
      knex('drugs').insert({
        id: 6,
        pharmaco_pubaddr: 2,
        brand_name: 'Diproplex',
        price_per_mg: 2,
        image_url: null,
        generic_id: 3
      }),
      knex('drugs').insert({
        id: 7,
        pharmaco_pubaddr: 4,
        brand_name: 'Oxanbital',
        price_per_mg: 4,
        image_url: null,
        generic_id: 1
      }),
      knex('drugs').insert({
        id: 8,
        pharmaco_pubaddr: 4,
        brand_name: 'Alitredizem Isoprotin',
        price_per_mg: 4,
        image_url: null,
        generic_id: 1
      }),
      knex('drugs').insert({
        id: 9,
        pharmaco_pubaddr: 5,
        brand_name: 'Amberuvax Infurolac',
        price_per_mg: 3,
        image_url: null,
        generic_id: 2
      }),
      knex('drugs').insert({
        id: 10,
        pharmaco_pubaddr: 5,
        brand_name: 'Atraxane Kinorabine',
        price_per_mg: 4,
        image_url: null,
        generic_id: 2
      }),
      knex('drugs').insert({
        id: 11,
        pharmaco_pubaddr: 1,
        brand_name: 'Clarirolac Adriagine',
        price_per_mg: 1,
        image_url: null,
        generic_id: 1
      }),
      knex('drugs').insert({
        id: 12,
        pharmaco_pubaddr: 5,
        brand_name: 'Romalamin',
        price_per_mg: 4,
        image_url: null,
        generic_id: 6
      }),
      knex('drugs').insert({
        id: 13,
        pharmaco_pubaddr: 1,
        brand_name: 'Ocuclude',
        price_per_mg: 1,
        image_url: null,
        generic_id: 2
      }),
      knex('drugs').insert({
        id: 14,
        pharmaco_pubaddr: 3,
        brand_name: 'Thalimunex',
        price_per_mg: 4,
        image_url: null,
        generic_id: 5
      }),
      knex('drugs').insert({
        id: 15,
        pharmaco_pubaddr: 2,
        brand_name: 'Asparenol',
        price_per_mg: 4,
        image_url: null,
        generic_id: 2
      }),
      knex('drugs').insert({
        id: 16,
        pharmaco_pubaddr: 4,
        brand_name: 'Megaretin',
        price_per_mg: 4,
        image_url: null,
        generic_id: 4
      }),
      knex('drugs').insert({
        id: 17,
        pharmaco_pubaddr: 5,
        brand_name: 'Ramicerol',
        price_per_mg: 2,
        image_url: null,
        generic_id: 4
      }),
      knex('drugs').insert({
        id: 18,
        pharmaco_pubaddr: 2,
        brand_name: 'Aldurabide Alinized',
        price_per_mg: 3,
        image_url: null,
        generic_id: 4
      }),
      knex('drugs').insert({
        id: 19,
        pharmaco_pubaddr: 2,
        brand_name: 'Brimonoin Pronex',
        price_per_mg: 4,
        image_url: null,
        generic_id: 1
      }),
      knex('drugs').insert({
        id: 20,
        pharmaco_pubaddr: 3,
        brand_name: 'Imicotrol Fenonavir',
        price_per_mg: 3,
        image_url: null,
        generic_id: 2
      })
    ]);
  });
};

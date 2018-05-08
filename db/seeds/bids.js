
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bids').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('bids').insert({
          pharmaco_pubaddr: '0x0000000000000000000000000000000000000003',
          contract_pubaddr: '0x0000000000000000000000000000000000000001',
          price_per_mg: 3
        })
      ]);
    });
};

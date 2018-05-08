
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bids').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('bids').insert({
          pharmaco_pubaddr: '0x9abbFB9219b405Fb2B0C89D4f07522CF32001A8B',
          contract_pubaddr: '0xd49bDC6802Acc58931591749607ad08cb13F8e67',
          price_per_mg: 3
        }),
        knex('bids').insert({
          pharmaco_pubaddr: '0x04C8559326Cd7649424708F85D45f8F924CC5b74',
          contract_pubaddr: '0xd49bDC6802Acc58931591749607ad08cb13F8e67',
          price_per_mg: 2
        })
      ]);
    });
};

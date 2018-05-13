
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contracts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('contracts').insert({
          public_address: '0xd49bDC6802Acc58931591749607ad08cb13F8e67',
          patient_pubaddr: '0xBb16559B164e4f0B872caAA640Dc1CCbf1f3E8b2',
          drug_id: 1,
          end_date: null
        }),
        knex('contracts').insert({
          public_address: '0xac68dB96A9E756a83AEC20d47DbeE90017a05bF2',
          patient_pubaddr: '0xa273e1C1Bd3FBC09b5274B2a2319193cd7298873',
          drug_id: 2,
          end_date: null
        })
      ]);
    });
};

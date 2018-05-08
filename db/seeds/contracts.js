
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contracts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('contracts').insert({
          public_address: '0x0000000000000000000000000000000000000001',
          patient_pubaddr: '0x0000000000000000000000000000000000000002',
          pharmaco_pubaddr: '0x0000000000000000000000000000000000000003',
          drug_id: 1,
          end_date: '2018-05-18'
        }),
        knex('contracts').insert({
          public_address: '0x0000000000000000000000000000000000000004',
          patient_pubaddr: '0x0000000000000000000000000000000000000005',
          pharmaco_pubaddr: '0x0000000000000000000000000000000000000006',
          drug_id: 2,
          end_date: '2018-05-19'
        }),
        knex('contracts').insert({
          public_address: '0x0000000000000000000000000000000000000007',
          patient_pubaddr: '0x0000000000000000000000000000000000000008',
          pharmaco_pubaddr: '0x0000000000000000000000000000000000000009',
          drug_id: 3,
          end_date: '2018-05-28'
        })
      ]);
    });
};

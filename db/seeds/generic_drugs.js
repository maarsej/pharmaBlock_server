
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('generic_drugs').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('generic_drugs').insert({
          id: 1,
          name: 'Adalimumab',
          description: 'For autoimmune diseases and moderate to severe active rheumatoid arthritis.'
        }),
        knex('generic_drugs').insert({
          id: 2,
          name: 'Aflibercept',
          description: 'For use in retinal indications.'
        }),
        knex('generic_drugs').insert({
          id: 3,
          name: 'Lenalidomide',
          description: 'For treatment of multiple myloma.'
        }),
        knex('generic_drugs').insert({
          id: 4,
          name: 'Rituximab',
          description: 'For cancer treatment.'
        }),
        knex('generic_drugs').insert({
          id: 5,
          name: 'Etanercept',
          description: 'For autoimmune diseases including rheumatoid arthritis, psoriasis and other inflammatory conditions.'
        }),
        knex('generic_drugs').insert({
          id: 6,
          name: 'Trastuzumab',
          description: 'For treatment of breast and gastric cancer.'
        })
       ]);
    });
};

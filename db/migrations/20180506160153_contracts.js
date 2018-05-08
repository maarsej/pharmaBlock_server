
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contracts', function (table) {
    table.increments();
    table.string('public_address');
    table.string('patient_pubaddr');
    table.string('pharmaco_pubaddr');
    table.integer('drug_id');
    table.date('end_date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contracts');
};

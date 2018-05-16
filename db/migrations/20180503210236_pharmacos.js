
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pharmacos', function (table) {
    table.string('public_address').primary();
    table.string('company_name');
    table.string('contact_name');
    table.string('email');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pharmacos');
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('patients', function (table) {
    table.string('public_address').primary();
    table.string('email');
    table.string('name');
    table.string('address');
    table.string('city');
    table.string('postal_code');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('patients');
};

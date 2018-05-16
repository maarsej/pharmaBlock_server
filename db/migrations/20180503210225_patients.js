
exports.up = function(knex, Promise) {
  return knex.schema.createTable('patients', function (table) {
    table.string('public_address').primary();
    table.string('email');
    table.string('username');
    table.string('password');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('patients');
};

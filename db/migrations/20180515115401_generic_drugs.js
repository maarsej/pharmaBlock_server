
exports.up = function(knex, Promise) {
  return knex.schema.createTable('generic_drugs', function (table) {
    table.integer('id');
    table.string('name');
    table.string('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('generic_drugs');
};


exports.up = function(knex, Promise) {
  return knex.schema.createTable('bids', function (table) {
    table.increments();
    table.string('pharmaco_address');
    table.string('contract_address');
    table.integer('price_per_mg');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bids');
};

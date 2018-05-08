
exports.up = function(knex, Promise) {
  return knex.schema.createTable('drugs', function (table) {
    table.increments();
    table.string('pharmaco_pubaddr');
    table.string('brand_name');
    table.string('generic_name');
    table.integer('price_per_mg');
    table.string('description');
    table.string('image_url');
    table.integer('flag');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('drugs');
};

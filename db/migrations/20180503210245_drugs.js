
exports.up = function(knex, Promise) {
  return knex.schema.createTable('drugs', function (table) {
    table.integer('id');
    table.string('pharmaco_pubaddr');
    table.string('brand_name');
    table.integer('price_per_mg');
    table.string('image_url');
    table.integer('generic_id');
    table.integer('flag');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('drugs');
};

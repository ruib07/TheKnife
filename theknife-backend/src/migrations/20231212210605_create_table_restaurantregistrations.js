exports.up = (knex) => {
  return knex.schema.createTable('restaurantregistrations', (t) => {
    t.increments('id').primary();
    t.string('flname', 50).notNull();
    t.integer('phone').notNull();
    t.string('email', 50).notNull();
    t.string('password', 100).notNull();
    t.string('name', 50).notNull();
    t.string('category', 50).notNull();
    t.string('desc', 250).notNull();
    t.integer('rphone').notNull();
    t.string('location', 150).notNull();
    t.string('image', 400).notNull();
    t.integer('numberoftables').notNull();
    t.integer('capacity').notNull();
    t.string('openingdays', 100).notNull();
    t.decimal('averageprice', 5, 1).notNull();
    t.time('openinghours').notNull();
    t.time('closinghours').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('restaurantregistrations');
};

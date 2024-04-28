exports.up = (knex) => {
  return knex.schema.createTable('restaurantresponsibles', (t) => {
    t.increments('id').primary();
    t.string('flname', 50).notNull();
    t.integer('phone').notNull();
    t.string('email', 100).notNull();
    t.string('password', 100).notNull();
    t.string('image', 400);
    t.integer('restaurantregistration_id')
      .references('id')
      .inTable('restaurantregistrations').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('restaurantresponsibles');
};

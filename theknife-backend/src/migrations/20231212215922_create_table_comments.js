exports.up = (knex) => {
  return knex.schema.createTable('comments', (t) => {
    t.increments('id').primary();
    t.string('username', 50).notNull();
    t.date('commentdate').notNull();
    t.decimal('review', 3, 1).notNull();
    t.string('comment', 250).notNull();
    t.integer('user_id')
      .references('id')
      .inTable('users').notNull();
    t.integer('restaurant_id')
      .references('id')
      .inTable('restaurants').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('comments');
};

exports.up = (knex) => {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('username', 50).notNull();
    t.string('email', 50).notNull();
    t.string('password', 100).notNull();
    t.string('image', 400);
    t.integer('registeruser_id')
      .references('id')
      .inTable('registerusers').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('users');
};

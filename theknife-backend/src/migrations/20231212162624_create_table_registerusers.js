exports.up = (knex) => {
  return knex.schema.createTable('registerusers', (t) => {
    t.increments('id').primary();
    t.string('username', 50).notNull();
    t.string('email', 50).notNull();
    t.string('password', 100).notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('registerusers');
};

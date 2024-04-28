exports.up = (knex) => {
  return knex.schema.createTable('contacts', (t) => {
    t.increments('id').primary();
    t.string('name', 50).notNull();
    t.string('email', 50).notNull();
    t.integer('phoneNumber').notNull();
    t.string('subject', 50).notNull();
    t.string('message', 250).notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('contacts');
};

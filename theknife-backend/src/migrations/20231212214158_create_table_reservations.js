exports.up = (knex) => {
  return knex.schema.createTable('reservations', (t) => {
    t.increments('id').primary();
    t.string('client_name', 50).notNull();
    t.integer('phonenumber').notNull();
    t.date('reservationdate').notNull();
    t.time('reservationtime').notNull();
    t.integer('numberpeople').notNull();
    t.integer('restaurant_id')
      .references('id')
      .inTable('restaurants').notNull();
    t.integer('user_id')
      .references('id')
      .inTable('users').notNull();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('reservations');
};

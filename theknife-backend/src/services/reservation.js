/* eslint-disable camelcase */
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const getAll = () => {
    return app.db('reservations');
  };

  const find = (filter = {}) => {
    return app.db('reservations').where(filter).first();
  };

  const save = (reservation) => {
    if (!reservation.client_name) throw new ValidationError('Primeiro e último nome é um atributo obrigatório!');
    if (!reservation.phonenumber) throw new ValidationError('Número de telefone é um atributo obrigatório!');
    if (!reservation.reservationdate) throw new ValidationError('Data é um atributo obrigatório!');
    if (!reservation.reservationtime) throw new ValidationError('Hora é um atributo obrigatório!');
    if (!reservation.numberpeople) throw new ValidationError('Número de pessoas é um atributo obrigatório!');
    return app.db('reservations').insert(reservation, '*');
  };

  const updateReservation = (id, user) => {
    return app.db('reservations')
      .where({ id })
      .update(user, '*');
  };

  const delReservation = (id) => {
    return app.db('reservations')
      .where({ id })
      .del();
  };

  return {
    getAll,
    find,
    save,
    updateReservation,
    delReservation,
  };
};

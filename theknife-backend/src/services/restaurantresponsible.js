const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const getAll = (filter = {}) => {
    return app.db('restaurantresponsibles').where(filter).select([
      'id',
      'flname',
      'phone',
      'email',
      'restaurantregistration_id',
    ]);
  };

  const find = (filter = {}) => {
    return app.db('restaurantresponsibles').where(filter).first();
  };

  const getPasswordHash = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
  };

  const save = async (registerrestaurantresponsible) => {
    if (!registerrestaurantresponsible.flname) throw new ValidationError('Nome do responsável do restaurante obrigatório!');
    if (!registerrestaurantresponsible.phone) throw new ValidationError('Telemóvel do responsável do restaurante obrigatório!');
    if (!registerrestaurantresponsible.email) throw new ValidationError('Email do responsável do restaurante obrigatório!');
    if (!registerrestaurantresponsible.password) throw new ValidationError('Password do responsável do restaurante obrigatório!');

    const responsibleDB = await find({ email: registerrestaurantresponsible.email });
    if (responsibleDB) throw new ValidationError('Email duplicado na BD');

    const newRestaurantResponsible = { ...registerrestaurantresponsible };
    newRestaurantResponsible.password = getPasswordHash(registerrestaurantresponsible.password);

    return app.db('restaurantresponsibles').insert(newRestaurantResponsible, [
      'id',
      'flname',
      'phone',
      'email',
      'restaurantregistration_id',
    ]);
  };

  const update = (id, rresponsible) => {
    const newUpdateResponsible = { ...rresponsible };
    newUpdateResponsible.password = getPasswordHash(rresponsible.password);

    return app.db('restaurantresponsibles')
      .where({ id })
      .update(newUpdateResponsible, [
        'id',
        'flname',
        'phone',
        'email',
        'restaurantregistration_id',
      ]);
  };

  return {
    getAll,
    find,
    save,
    update,
  };
};

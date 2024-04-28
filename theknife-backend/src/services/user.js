/* eslint-disable no-useless-catch */
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const getAll = (filter = {}) => {
    return app.db('users').where(filter).select([
      'id',
      'username',
      'email',
    ]);
  };

  const find = (filter = {}) => {
    return app.db('users').where(filter).first();
  };

  const getPasswordHash = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
  };

  const save = async (registeruser) => {
    try {
      if (!registeruser.username) throw new ValidationError('Username é um atributo obrigatório!');
      if (!registeruser.email) throw new ValidationError('Email é um atributo obrigatório!');
      if (!registeruser.password) throw new ValidationError('Password é um atributo obrigatório!');

      const userDB = await find({ email: registeruser.email });
      if (userDB) throw new ValidationError('Email duplicado na BD');

      const newUser = { ...registeruser };
      newUser.password = getPasswordHash(registeruser.password);

      const [user] = await app.db('users').insert(newUser, [
        'id',
        'username',
        'email',
        'image',
      ]);

      if (!user) {
        throw new ValidationError('Erro a guardar o utilizador!');
      }

      return user;
    } catch (error) {
      throw error;
    }
  };

  const update = (id, user) => {
    const newUpdateUser = { ...user };
    newUpdateUser.password = getPasswordHash(user.password);

    return app.db('users')
      .where({ id })
      .update(newUpdateUser, [
        'id',
        'username',
        'email',
        'image',
      ]);
  };

  return {
    getAll,
    find,
    save,
    update,
  };
};

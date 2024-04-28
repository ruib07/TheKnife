/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const getAll = (filter = {}) => {
    return app.db('registerusers').where(filter).select([
      'id',
      'username',
      'email',
    ]);
  };

  const find = (filter = {}) => {
    return app.db('registerusers').where(filter).first();
  };

  const getPasswordHash = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
  };

  const validatePassword = (password) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isLengthValid = password.length >= 9;

    return hasLowercase && hasUppercase && hasDigit && hasSpecialChar && isLengthValid;
  };

  const save = async (registeruser) => {
    if (!registeruser.username) throw new ValidationError('Username é um atributo obrigatório!');
    if (!registeruser.email) throw new ValidationError('Email é um atributo obrigatório!');
    if (!registeruser.password) throw new ValidationError('Password é um atributo obrigatório!');

    if (!validatePassword(registeruser.password)) {
      throw new ValidationError('A password não cumpre os requisitos');
    }

    const registerUserDB = await find({ email: registeruser.email });
    if (registerUserDB) throw new ValidationError('Email duplicado na BD');

    const newRegisterUser = { ...registeruser };
    newRegisterUser.password = getPasswordHash(registeruser.password);

    return app.db('registerusers').insert(newRegisterUser, [
      'id',
      'username',
      'email',
    ]);
  };

  const update = async (id, userRes) => {
    if (!validatePassword(userRes.password)) {
      throw new ValidationError('A password não cumpre os requisitos');
    }

    const newUpdateUserRegistration = { ...userRes };
    newUpdateUserRegistration.password = getPasswordHash(userRes.password);

    return app.db('registerusers')
      .where({ id })
      .update(newUpdateUserRegistration, [
        'id',
        'username',
        'email',
      ]);
  };

  const confirmEmail = async (email) => {
    const user = await find({ email });

    if (!user) {
      return { error: 'Email não encontrado!' };
    }

    if (user.confirmed) {
      return { error: 'Email já confirmado!' };
    }

    return { success: true };
  };

  const updatePassword = async (email, newPassword, confirmNewPassword) => {
    try {
      if (!validatePassword(newPassword)) {
        throw new ValidationError('A password não cumpre os requisitos');
      }

      const user = await app.services.registeruser.find({ email });
      if (!user) {
        return { error: 'Utilizador não encontrado!' };
      }

      if (newPassword !== confirmNewPassword) {
        return { error: 'A Palavra Passe deve ser igual nos dois campos!' };
      }

      const updatePasswords = await Promise.all([
        app.db('registerusers').where({ email }).update({ password: getPasswordHash(newPassword) }, '*'),
        app.db('users').where({ email }).update({ password: getPasswordHash(newPassword) }, '*'),
      ]);

      return { success: true };
    } catch (error) {
      if (error instanceof ValidationError) {
        return { error: error.message };
      }

      return { error: 'Erro!' };
    }
  };

  return {
    getAll,
    find,
    save,
    confirmEmail,
    update,
    updatePassword,
  };
};

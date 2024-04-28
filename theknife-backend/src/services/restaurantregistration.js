/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const getAll = (filter = {}) => {
    return app.db('restaurantregistrations').where(filter).select([
      'id',
      'flname',
      'phone',
      'email',
      'name',
      'category',
      'desc',
      'rphone',
      'location',
      'image',
      'numberoftables',
      'capacity',
      'openingdays',
      'averageprice',
      'openinghours',
      'closinghours',
    ]);
  };

  const find = (filter = {}) => {
    return app.db('restaurantregistrations').where(filter).first();
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

  const save = async (restaurantregistration) => {
    if (!restaurantregistration.flname) throw new ValidationError('Nome do responsável do restaurante obrigatório!');
    if (!restaurantregistration.phone) throw new ValidationError('Telemóvel do responsável do restaurante obrigatório!');
    if (!restaurantregistration.email) throw new ValidationError('Email do responsável do restaurante obrigatório!');
    if (!restaurantregistration.password) throw new ValidationError('Password do responsável do restaurante obrigatório!');
    if (!restaurantregistration.name) throw new ValidationError('Nome do restaurante é um atributo obrigatório!');
    if (!restaurantregistration.category) throw new ValidationError('Categoria do restaurante é um atributo obrigatório!');
    if (!restaurantregistration.desc) throw new ValidationError('Descrição do restaurante é um atributo obrigatório!');
    if (!restaurantregistration.rphone) throw new ValidationError('Telefone do restaurante é um atributo obrigatório!');
    if (!restaurantregistration.location) throw new ValidationError('Localização do restaurante é um atributo obrigatório!');
    if (!restaurantregistration.image) throw new ValidationError('Imagem do restaurante é um atributo obrigatório!');
    if (!restaurantregistration.numberoftables) throw new ValidationError('Número de mesas do restaurante é um atributo obrigatório!');
    if (!restaurantregistration.capacity) throw new ValidationError('Capacidade do restaurante é um atributo obrigatório!');
    if (!restaurantregistration.openingdays) throw new ValidationError('Dias de funcionamento são um atributo obrigatório!');
    if (!restaurantregistration.averageprice) throw new ValidationError('Preço médio é um atributo obrigatório!');
    if (!restaurantregistration.openinghours) throw new ValidationError('Horas de abertura são um atributo obrigatório!');
    if (!restaurantregistration.closinghours) throw new ValidationError('Horas de fecho são um atributo obrigatório!');

    if (!validatePassword(restaurantregistration.password)) {
      throw new ValidationError('A password não cumpre os requisitos');
    }

    const restaurantRegistrationDB = await find({ email: restaurantregistration.email });
    if (restaurantRegistrationDB) throw new ValidationError('Email duplicado na BD');

    const newRestaurantRegistration = { ...restaurantregistration };
    newRestaurantRegistration.password = getPasswordHash(restaurantregistration.password);

    return app.db('restaurantregistrations').insert(newRestaurantRegistration, [
      'id',
      'flname',
      'phone',
      'email',
      'name',
      'category',
      'desc',
      'rphone',
      'location',
      'image',
      'numberoftables',
      'capacity',
      'openingdays',
      'averageprice',
      'openinghours',
      'closinghours',
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

      const restaurantResgistration = await app.services.restaurantregistration.find({ email });

      if (!restaurantResgistration) {
        return { error: 'Responsável não encontrado!' };
      }

      if (newPassword !== confirmNewPassword) {
        return { error: 'A Palavra Passe deve ser igual nos dois campos!' };
      }

      const updatePasswords = await Promise.all([
        app.db('restaurantregistrations').where({ email }).update({ password: getPasswordHash(newPassword) }, '*'),
        app.db('restaurantresponsibles').where({ email }).update({ password: getPasswordHash(newPassword) }, '*'),
      ]);

      return { success: true };
    } catch (error) {
      if (error instanceof ValidationError) {
        return { error: error.message };
      }

      return { error: 'Erro!' };
    }
  };

  const update = (id, restaurantRes) => {
    if (!validatePassword(restaurantRes.password)) {
      throw new ValidationError('A password não cumpre os requisitos');
    }
    const newUpdateRestaurantRegistration = { ...restaurantRes };
    newUpdateRestaurantRegistration.password = getPasswordHash(restaurantRes.password);

    return app.db('restaurantregistrations')
      .where({ id })
      .update(newUpdateRestaurantRegistration, [
        'id',
        'flname',
        'phone',
        'email',
        'name',
        'category',
        'desc',
        'rphone',
        'location',
        'image',
        'numberoftables',
        'capacity',
        'openingdays',
        'averageprice',
        'openinghours',
        'closinghours',
      ]);
  };

  return {
    getAll,
    find,
    save,
    confirmEmail,
    updatePassword,
    update,
  };
};

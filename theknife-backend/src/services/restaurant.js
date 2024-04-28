/* eslint-disable no-useless-catch */
/* eslint-disable camelcase */
const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const getAll = () => {
    return app.db('restaurants');
  };

  const find = (filter = {}) => {
    return app.db('restaurants').where(filter).first();
  };

  const save = async (registerrestaurant) => {
    try {
      if (!registerrestaurant.name) throw new ValidationError('Nome do restaurante é um atributo obrigatório!');
      if (!registerrestaurant.category) throw new ValidationError('Categoria do restaurante é um atributo obrigatório!');
      if (!registerrestaurant.desc) throw new ValidationError('Descrição do restaurante é um atributo obrigatório!');
      if (!registerrestaurant.rphone) throw new ValidationError('Telefone do restaurante é um atributo obrigatório!');
      if (!registerrestaurant.location) throw new ValidationError('Localização do restaurante é um atributo obrigatório!');
      if (!registerrestaurant.image) throw new ValidationError('Imagem do restaurante é um atributo obrigatório!');
      if (!registerrestaurant.numberoftables) throw new ValidationError('Número de mesas do restaurante é um atributo obrigatório!');
      if (!registerrestaurant.capacity) throw new ValidationError('Capacidade do restaurante é um atributo obrigatório!');
      if (!registerrestaurant.openingdays) throw new ValidationError('Dias de funcionamento são um atributo obrigatório!');
      if (!registerrestaurant.averageprice) throw new ValidationError('Preço médio é um atributo obrigatório!');
      if (!registerrestaurant.openinghours) throw new ValidationError('Horas de abertura são um atributo obrigatório!');
      if (!registerrestaurant.closinghours) throw new ValidationError('Horas de fecho são um atributo obrigatório!');
      const [restaurant] = await app.db('restaurants').insert(registerrestaurant, '*');

      if (!restaurant) {
        throw new ValidationError('Erro ao guardar o restaurante!');
      }

      return restaurant;
    } catch (error) {
      throw error;
    }
  };

  const update = (id, restaurantRes) => {
    return app.db('restaurants')
      .where({ id })
      .update(restaurantRes, '*');
  };

  return {
    getAll,
    find,
    save,
    update,
  };
};

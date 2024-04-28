const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const createContact = async (contact) => {
    try {
      const result = await app.db('contacts').insert(contact, '*');
      return result[0];
    } catch (error) {
      throw new ValidationError('Preencha todos os campos obrigatórios!');
    }
  };

  const getAllContacts = async () => {
    try {
      return await app.db('contacts');
    } catch (error) {
      throw new ValidationError('Erro ao obter todos os contactos da base de dados.');
    }
  };

  const getContactById = async (id) => {
    try {
      return await app.db('contacts').where({ id }).first();
    } catch (error) {
      throw new ValidationError('Erro ao obter o contato da base de dados.');
    }
  };

  return {
    createContact,
    getAllContacts,
    getContactById,
  };
};

const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const getAll = () => {
    return app.db('comments');
  };

  const find = (filter = {}) => {
    return app.db('comments').where(filter).first();
  };

  const save = (registercomment) => {
    if (!registercomment.username) throw new ValidationError('Username é um atributo obrigatório!');
    if (!registercomment.commentdate) throw new ValidationError('Data do comentário é um atributo obrigatório!');
    if (!registercomment.review) throw new ValidationError('Review é um atributo obrigatório!');
    if (!registercomment.comment) throw new ValidationError('Comentário é um atributo obrigatório!');

    return app.db('comments').insert(registercomment, '*');
  };

  const update = (id, commentRes) => {
    return app.db('comments')
      .where({ id })
      .update(commentRes, '*');
  };

  const remove = (id) => {
    return app.db('comments')
      .where({ id })
      .del();
  };

  return {
    getAll,
    find,
    save,
    update,
    remove,
  };
};

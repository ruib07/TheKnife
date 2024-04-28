module.exports = (app) => {
  const getAll = (req, res, next) => {
    app.services.restaurant.getAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const getId = (req, res, next) => {
    app.services.restaurant.find({ id: req.params.id })
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const create = (req, res, next) => {
    app.services.restaurant.save(req.body)
      .then((result) => {
        return res.status(201).json(result);
      }).catch((err) => {
        next(err);
      });
  };

  const update = (req, res, next) => {
    app.services.restaurant.update(req.params.id, req.body)
      .then((result) => res.status(200).json(result[0]))
      .catch((err) => next(err));
  };

  return {
    getAll,
    getId,
    create,
    update,
  };
};

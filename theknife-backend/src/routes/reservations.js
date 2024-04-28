module.exports = (app) => {
  const getAll = (req, res, next) => {
    app.services.reservation.getAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const getId = (req, res, next) => {
    app.services.reservation.find({ id: req.params.id })
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const create = (req, res, next) => {
    app.services.reservation.save(req.body)
      .then((result) => {
        return res.status(201).json(result);
      }).catch((err) => {
        next(err);
      });
  };

  const update = async (req, res, next) => {
    app.services.reservation.updateReservation(req.params.id, req.body)
      .then((result) => res.status(200).json(result[0]))
      .catch((err) => next(err));
  };

  const remove = (req, res, next) => {
    app.services.reservation.delReservation(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  };

  return {
    getAll,
    getId,
    create,
    update,
    remove,
  };
};

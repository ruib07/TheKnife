module.exports = (app) => {
  const createContact = (req, res, next) => {
    app.services.contact.createContact(req.body)
      .then((result) => {
        return res.status(201).json(result);
      }).catch((err) => {
        next(err);
      });
  };

  const getAllContacts = (req, res, next) => {
    app.services.contact.getAllContacts()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const getContactById = (req, res, next) => {
    const { id } = req.params;
    app.services.contact.getContactById(id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  return {
    createContact,
    getAllContacts,
    getContactById,
  };
};

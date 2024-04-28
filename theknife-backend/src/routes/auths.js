const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

const responsibleSecret = 'ipca!DWM@202324';

const userSecret = 'ipcaDWM@202324';

module.exports = (app) => {
  const responsiblesignin = (req, res, next) => {
    app.services.restaurantresponsible.find({
      email: req.body.email,
    })
      .then((responsible) => {
        if (bcrypt.compareSync(req.body.password, responsible.password)) {
          const payload = {
            id: responsible.id,
            flname: responsible.flname,
            phone: responsible.phone,
            email: responsible.email,
            password: responsible.password,
            image: responsible.image,
            restaurantregistration_id: responsible.restaurantregistration_id,
          };
          const token = jwt.encode(payload, responsibleSecret);
          res.status(200).json({ token, user: payload });
        } else {
          res.status(400).json({ error: 'Autenticação inválida!' });
        }
      })
      .catch((err) => next(err));
  };

  const usersignin = (req, res, next) => {
    app.services.user.find({
      email: req.body.email,
    })
      .then((user) => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            image: user.image,
            registeruser_id: user.id,
          };
          const usertoken = jwt.encode(payload, userSecret);
          res.status(200).json({ usertoken, user: payload });
        } else {
          res.status(400).json({ error: 'Autenticação invalida' });
        }
      })
      .catch((err) => next(err));
  };

  return { responsiblesignin, usersignin };
};

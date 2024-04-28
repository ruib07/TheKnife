const userpassport = require('passport');

const passportJwt = require('passport-jwt');

const { Strategy, ExtractJwt } = passportJwt;

const userSecret = 'ipcaDWM@202324';

module.exports = (app) => {
  const userparams = {
    secretOrKey: userSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const userstrategy = new Strategy(userparams, (payload, done) => {
    app.services.user.find({ id: payload.id })
      .then((user) => {
        if (user) done(null, { ...payload });
        else done(null, false);
      }).catch((err) => done(err, false));
  });

  userpassport.use('user-jwt', userstrategy);

  return {
    userauthenticate: () => userpassport.authenticate('user-jwt', { session: false }),
  };
};

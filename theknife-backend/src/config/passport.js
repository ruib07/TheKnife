const responsiblepassport = require('passport');

const passportJwt = require('passport-jwt');

const responsibleSecret = 'ipca!DWM@202324';

const { Strategy, ExtractJwt } = passportJwt;

module.exports = (app) => {
  const responsibleparams = {
    secretOrKey: responsibleSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const responsiblestrategy = new Strategy(responsibleparams, (payload, done) => {
    app.services.restaurantresponsible.find({ id: payload.id })
      .then((responsible) => {
        if (responsible) done(null, { ...payload });
        else done(null, false);
      }).catch((err) => done(err, false));
  });

  responsiblepassport.use(responsiblestrategy);

  return {
    responsibleauthenticate: () => responsiblepassport.authenticate('jwt', { session: false }),
  };
};

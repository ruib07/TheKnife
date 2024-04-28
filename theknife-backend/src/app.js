const app = require('express')();
const consign = require('consign');
const cors = require('cors');
const knex = require('knex');
const knexfile = require('../knexfile');
const config = require('./config');

app.db = knex(knexfile[config.NODE_ENV]);

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));

consign({ cwd: 'src', verbose: false })
  .include('./config/passport.js')
  .include('./config/passportuser.js')
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/routes.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'validationError') res.status(400).json({ error: message });
  else res.status(500).json({ name, message, stack });
  next(err);
});

module.exports = app;

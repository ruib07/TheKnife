const request = require('supertest');
const uuid = require('uuid');

const app = require('../../src/app');

const responsibleSigninRoute = '/auths/responsiblesignin';
const responsibleSignupRoute = '/auths/responsiblesignup';
const responsibleRoute = '/restaurantresponsibles';
const responsibleRouteById = '/restaurantresponsibles/:id';

const generateUniqueEmailResponsible = () => `${uuid.v4()}@gmail.com`;

let responsible;

const userSigninRoute = '/auths/usersignin';
const userSignupRoute = '/auths/usersignup';
const userRoute = '/users';

const generateUniqueEmailUser = () => `${uuid.v4()}@gmail.com`;

let user;

beforeAll(async () => {
  const responsibleMail = generateUniqueEmailResponsible();

  const registrationRes = await app.services.restaurantregistration.save({
    flname: 'Rui Barreto',
    phone: 912345678,
    email: responsibleMail,
    password: 'Rui@12-AA',
    name: 'La Gusto Italiano',
    category: 'Comida Italiana',
    desc: 'Restaurante de comida italiana situado em Braga',
    rphone: 253456789,
    location: 'Rua Gonçalo Sousa 285',
    image: 'https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg',
    numberoftables: 10,
    capacity: 200,
    openingdays: 'Aberto de segunda a sábado',
    averageprice: 18.75,
    openinghours: '10:30',
    closinghours: '23:00',
  });
  responsible = { ...registrationRes[0] };

  const userMail = generateUniqueEmailUser();

  const res = await app.services.registeruser.save({
    username: 'goncalosousa',
    email: userMail,
    password: 'Goncalo@12-AA',
  });
  user = { ...res[0] };
});

test('Test #67 - Receber token ao autenticar para os responsáveis', () => {
  const responsibleMail = generateUniqueEmailResponsible();

  return app.services.restaurantresponsible.save({
    flname: 'Rui Auth',
    phone: 912345678,
    email: responsibleMail,
    password: 'Rui@12-AA',
    image: null,
    restaurantregistration_id: responsible.id,
  })
    .then(() => request(app).post(responsibleSigninRoute)
      .send({
        email: responsibleMail,
        password: 'Rui@12-AA',
      }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
});

test('Test #68 - Tentativa de autenticação errada para os responsáveis', () => {
  const responsibleMail = generateUniqueEmailResponsible();

  return app.services.restaurantresponsible.save({
    flname: 'Rui Auth',
    phone: 912345678,
    email: responsibleMail,
    password: 'Rui@12-AA',
    image: null,
    restaurantregistration_id: responsible.id,
  })
    .then(() => request(app).post(responsibleSigninRoute)
      .send({
        email: responsibleMail,
        password: '67890',
      }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Autenticação inválida!');
    });
});

test('Test #69 - Aceder a rotas protegidas dos responsáveis #1', () => {
  return request(app).get(responsibleRoute)
    .then((res) => {
      expect(res.status).toBe(401);
    });
});

test('Test #70 - Aceder a rotas protegidas dos responsáveis #2', () => {
  return request(app).get(responsibleRouteById)
    .then((res) => {
      expect(res.status).toBe(401);
    });
});

test('Test #71 - Criar um Responsável', () => {
  const responsibleMail = generateUniqueEmailResponsible();

  return request(app)
    .post(responsibleSignupRoute)
    .send({
      flname: 'Rui Signup',
      phone: 912345678,
      email: responsibleMail,
      password: 'Rui@12-AA',
      image: null,
      restaurantregistration_id: responsible.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body[0].flname).toBe('Rui Signup');
      expect(res.body[0]).toHaveProperty('email');
      expect(res.body[0]).not.toHaveProperty('password');
    });
});

test('Test #72 - Receber Token User', () => {
  const userMail = generateUniqueEmailUser();

  return app.services.user.save({
    username: 'Goncalo Auth',
    email: userMail,
    password: 'Goncalo@12-AA',
    image: null,
    registeruser_id: user.id,
  })
    .then(() => request(app).post(userSigninRoute)
      .send({
        email: userMail,
        password: 'Goncalo@12-AA',
      }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('usertoken');
    });
});

test('Test #73 - Autenticação Errado User', () => {
  const userMail = generateUniqueEmailUser();

  return app.services.user.save({
    username: 'Goncalo Auth',
    email: userMail,
    password: 'Goncalo@12-AA',
    image: null,
    registeruser_id: user.id,
  })
    .then(() => request(app).post(userSigninRoute)
      .send({
        email: userMail,
        password: 'Goncalo@12-BB',
      }))
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Autenticação invalida');
    });
});

test('Test #74 - Aceder a rotas protegidas users', () => {
  return request(app).get(userRoute)
    .then((res) => {
      expect(res.status).toBe(401);
    });
});

test('Test #75 - Criar um Utilizador', () => {
  const userMail = generateUniqueEmailUser();

  return request(app)
    .post(userSignupRoute)
    .send({
      username: 'Goncalo Signup',
      email: userMail,
      password: 'Goncalo@12-AA',
      image: null,
      registeruser_id: user.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.username).toBe('Goncalo Signup');
      expect(res.body).toHaveProperty('email');
      expect(res.body).not.toHaveProperty('password');
    });
});

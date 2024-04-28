const request = require('supertest');
const uuid = require('uuid');

const jwt = require('jwt-simple');

const app = require('../../src/app');

const route = '/users';

const userSecret = 'ipcaDWM@202324';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let user;
let userToken;

beforeAll(async () => {
  const userMail = generateUniqueEmail();

  const res = await app.services.registeruser.save({
    username: 'goncalosousa',
    email: userMail,
    password: 'Goncalo@12-AA',
  });
  user = { ...res[0] };

  const userRes = await app.services.user.save({
    username: 'goncalosousa',
    email: userMail,
    password: 'Goncalo@12-AA',
    image: null,
    registeruser_id: user.id,
  });

  userToken = { ...userRes };
  userToken.usertoken = jwt.encode(userToken, userSecret);
});

test('Test #60 - Listar todos os utilizadores', () => {
  return request(app).get(route)
    .set('Authorization', `bearer ${userToken.usertoken}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #61 - Listar um user por ID', () => {
  const userMail = generateUniqueEmail();

  return app.db('users')
    .insert({
      username: 'goncalosousa',
      email: userMail,
      password: 'Goncalo@12-AA',
      image: null,
      registeruser_id: user.id,
    }, ['id'])
    .then((userRes) => request(app).get(`${route}/${userRes[0].id}`)
      .set('Authorization', `bearer ${userToken.usertoken}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.username).toBe('goncalosousa');
    });
});

test('Test #62 - Inserir um utilizador', () => {
  const userMail = generateUniqueEmail();

  return request(app).post(route)
    .set('Authorization', `bearer ${userToken.usertoken}`)
    .send({
      username: 'goncalosousa',
      email: userMail,
      password: 'Goncalo@12-AA',
      image: null,
      registeruser_id: user.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.username).toBe('goncalosousa');
      expect(res.body).not.toHaveProperty('password');
    });
});

test('Test #62.1 - Guardar password encriptada', async () => {
  const userMail = generateUniqueEmail();

  const res = await request(app).post(route)
    .set('Authorization', `bearer ${userToken.usertoken}`)
    .send({
      username: 'goncalosousa',
      email: userMail,
      password: 'Goncalo@12-AA',
      image: null,
      registeruser_id: user.id,
    });

  expect(res.status).toBe(201);

  const { id } = res.body;
  const userRegistrationDB = await app.services.user.find({ id });
  expect(userRegistrationDB.password).not.toBeUndefined();
  expect(userRegistrationDB.password).not.toBe('goncalo123');
});

describe('Validação de criar um user', () => {
  const userMail = generateUniqueEmail();

  const testTemplate = (newData, errorMessage) => {
    return request(app).post(route)
      .set('Authorization', `bearer ${userToken.usertoken}`)
      .send({
        username: 'goncalosousa',
        email: userMail,
        password: 'Goncalo@12-AA',
        image: null,
        registeruser_id: user.id,
        ...newData,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(errorMessage);
      });
  };

  test('Test #63 - Inserir um utilizador sem username', () => testTemplate({ username: null }, 'Username é um atributo obrigatório!'));
  test('Test #64 - Inserir um utilizador sem email', () => testTemplate({ email: null }, 'Email é um atributo obrigatório!'));
  test('Test #65 - Inserir um utilizador sem password', () => testTemplate({ password: null }, 'Password é um atributo obrigatório!'));
});

test('Test #66 - Atualizar os dados de um utilizador', () => {
  const userMail = generateUniqueEmail();

  return app.db('users')
    .insert({
      username: 'goncalosousa',
      email: userMail,
      password: 'Goncalo@12-AA',
      image: null,
      registeruser_id: user.id,
    }, ['id'])
    .then((userRes) => request(app).put(`${route}/${userRes[0].id}`)
      .set('Authorization', `bearer ${userToken.usertoken}`)
      .send({
        username: 'goncalocoutinhosousa',
        email: 'goncalosousa123@gmail.com',
        password: 'Goncalo@12-BB',
        image: null,
        registeruser_id: user.id,
      }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.username).toBe('goncalocoutinhosousa');
      expect(res.body).not.toHaveProperty('password');
    });
});

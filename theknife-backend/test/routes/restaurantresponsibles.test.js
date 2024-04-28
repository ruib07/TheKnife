const request = require('supertest');
const uuid = require('uuid');

const jwt = require('jwt-simple');

const app = require('../../src/app');

const route = '/restaurantresponsibles';

const responsiblesecret = 'ipca!DWM@202324';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let responsible;
let responsibleRegistration;

beforeAll(async () => {
  const mail = generateUniqueEmail();

  const registrationRes = await app.services.restaurantregistration.save({
    flname: 'Rui Barreto',
    phone: 912345678,
    email: mail,
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

  const res = await app.services.restaurantresponsible.save({
    flname: 'Rui Barreto',
    phone: 912345678,
    email: mail,
    password: 'Rui@12-AA',
    image: null,
    restaurantregistration_id: responsible.id,
  });

  responsibleRegistration = { ...res[0] };
  responsibleRegistration.token = jwt.encode(responsibleRegistration, responsiblesecret);
});

test('Test #25 - Listar todos os perfis de responsáveis de restaurantes', () => {
  return request(app).get(route)
    .set('Authorization', `bearer ${responsibleRegistration.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #26 - Listar um perfil de um responsável de um restaurante por ID', () => {
  const mail = generateUniqueEmail();

  return app.db('restaurantresponsibles')
    .insert({
      flname: 'Rui Barreto',
      phone: 912345678,
      email: mail,
      password: 'Rui@12-AA',
      image: null,
      restaurantregistration_id: responsible.id,
    }, ['id'])
    .then((rresponsibleRes) => request(app).get(`${route}/${rresponsibleRes[0].id}`)
      .set('Authorization', `bearer ${responsibleRegistration.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.flname).toBe('Rui Barreto');
    });
});

test('Test #27 - Inserir um perfil de um responsável de um restaurante', () => {
  const mail = generateUniqueEmail();

  return request(app).post(route)
    .set('Authorization', `bearer ${responsibleRegistration.token}`)
    .send({
      flname: 'Rui Barreto',
      phone: 912345678,
      email: mail,
      password: 'Rui@12-AA',
      image: null,
      restaurantregistration_id: responsible.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body).not.toHaveProperty('password');
    });
});

describe('Validação de criar um responsável de um restaurante', () => {
  const mail = generateUniqueEmail();

  const testTemplate = (newData, errorMessage) => {
    return request(app).post(route)
      .set('Authorization', `bearer ${responsibleRegistration.token}`)
      .send({
        flname: 'Rui Barreto',
        phone: 912345678,
        email: mail,
        password: 'Rui@12-AA',
        image: null,
        restaurantregistration_id: responsible.id,
        ...newData,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(errorMessage);
      });
  };

  test('Test #28 - Inserir um perfil de um responsável sem nome', () => testTemplate({ flname: null }, 'Nome do responsável do restaurante obrigatório!'));
  test('Test #29 - Inserir um perfil de um responsável sem telemóvel', () => testTemplate({ phone: null }, 'Telemóvel do responsável do restaurante obrigatório!'));
  test('Test #30 - Inserir um perfil de um responsável sem email', () => testTemplate({ email: null }, 'Email do responsável do restaurante obrigatório!'));
  test('Test #31 - Inserir um perfil de um responsável sem password', () => testTemplate({ password: null }, 'Password do responsável do restaurante obrigatório!'));
});

test('Test #32 - Atualizar os dados de um perfil de um responsável de um restaurante', () => {
  const mail = generateUniqueEmail();

  return app.db('restaurantresponsibles')
    .insert({
      flname: 'Rui Barreto',
      phone: 912345678,
      email: mail,
      password: 'Rui@12-AA',
      image: null,
      restaurantregistration_id: responsible.id,
    }, ['id'])
    .then((rresponsibleRes) => request(app).put(`${route}/${rresponsibleRes[0].id}`)
      .set('Authorization', `bearer ${responsibleRegistration.token}`)
      .send({
        flname: 'Rui Barreto',
        phone: 964769078,
        email: 'ruibarreto123@gmail.com',
        password: 'Rui@12-BB',
        image: 'https://img.freepik.com/free-photo/portrait-handsome-man-with-dark-hairstyle-bristle-toothy-smile-dressed-white-sweatshirt-feels-very-glad-poses-indoor-pleased-european-guy-being-good-mood-smiles-positively-emotions-concept_273609-61405.jpg',
        restaurantregistration_id: responsible.id,
      }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.email).toBe('ruibarreto123@gmail.com');
      expect(res.body).not.toHaveProperty('password');
    });
});

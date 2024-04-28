const request = require('supertest');
const uuid = require('uuid');

const jwt = require('jwt-simple');

const app = require('../../src/app');

const route = '/restaurants';

const secret = 'ipca!DWM@202324';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

let restaurant;
let restaurantResponsible;
let responsibleRegistration;

beforeAll(async () => {
  const responsibleMail = generateUniqueEmail();

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
  restaurant = { ...registrationRes[0] };

  const registrationResponsible = await app.services.restaurantresponsible.save({
    flname: 'Rui Barreto',
    phone: 912345678,
    email: responsibleMail,
    password: 'Rui@12-AA',
    restaurantregistration_id: restaurant.id,
  });
  restaurantResponsible = { ...registrationResponsible[0] };

  const mail = generateUniqueEmail();

  const res = await app.services.restaurantresponsible.save({
    flname: 'Rui Barreto',
    phone: 912345678,
    email: mail,
    password: 'Rui@12-AA',
    image: null,
    restaurantregistration_id: restaurant.id,
  });

  responsibleRegistration = { ...res[0] };
  responsibleRegistration.token = jwt.encode(responsibleRegistration, secret);
});

test('Test #33 - Listar todos os restaurantes', () => {
  return request(app).get(route)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #34 - Listar um restaurante por ID', () => {
  return app.db('restaurants')
    .insert({
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
      restaurantregistration_id: restaurant.id,
      rresponsible_id: restaurantResponsible.id,
    }, ['id'])
    .then((getRestaurant) => request(app).get(`${route}/${getRestaurant[0].id}`)
      .set('Authorization', `bearer ${responsibleRegistration.token}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('La Gusto Italiano');
    });
});

test('Test #35 - Inserir um restaurante', () => {
  return request(app).post(route)
    .send({
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
      restaurantregistration_id: restaurant.id,
      rresponsible_id: restaurantResponsible.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('La Gusto Italiano');
    });
});

describe('Validação de criar um restaurante', () => {
  const testTemplate = (newData, errorMessage) => {
    return request(app).post(route)
      .set('Authorization', `bearer ${responsibleRegistration.token}`)
      .send({
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
        restaurantregistration_id: restaurant.id,
        rresponsible_id: restaurantResponsible.id,
        ...newData,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(errorMessage);
      });
  };

  test('Test #36 - Inserir um restaurante sem nome do restaurante', () => testTemplate({ name: null }, 'Nome do restaurante é um atributo obrigatório!'));
  test('Test #37 - Inserir um restaurante sem categoria do restaurante', () => testTemplate({ category: null }, 'Categoria do restaurante é um atributo obrigatório!'));
  test('Test #38 - Inserir um restaurante sem descrição do restaurante', () => testTemplate({ desc: null }, 'Descrição do restaurante é um atributo obrigatório!'));
  test('Test #39 - Inserir um restaurante sem telefone do restaurante', () => testTemplate({ rphone: null }, 'Telefone do restaurante é um atributo obrigatório!'));
  test('Test #40 - Inserir um restaurante sem localização do restaurante', () => testTemplate({ location: null }, 'Localização do restaurante é um atributo obrigatório!'));
  test('Test #41 - Inserir um restaurante sem imagem do restaurante', () => testTemplate({ image: null }, 'Imagem do restaurante é um atributo obrigatório!'));
  test('Test #42 - Inserir um restaurante sem número de mesas do restaurante', () => testTemplate({ numberoftables: null }, 'Número de mesas do restaurante é um atributo obrigatório!'));
  test('Test #43 - Inserir um restaurante sem capacidade do restaurante', () => testTemplate({ capacity: null }, 'Capacidade do restaurante é um atributo obrigatório!'));
  test('Test #44 - Inserir um restaurante sem dias de funcionamento', () => testTemplate({ openingdays: null }, 'Dias de funcionamento são um atributo obrigatório!'));
  test('Test #45 - Inserir um restaurante sem preço médio', () => testTemplate({ averageprice: null }, 'Preço médio é um atributo obrigatório!'));
  test('Test #46 - Inserir um restaurante sem horas de abertura', () => testTemplate({ openinghours: null }, 'Horas de abertura são um atributo obrigatório!'));
  test('Test #47 - Inserir um restaurante sem horas de fecho', () => testTemplate({ closinghours: null }, 'Horas de fecho são um atributo obrigatório!'));
});

test('Test #48 - Atualizar dados de um restaurante', () => {
  return app.db('restaurants')
    .insert({
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
      restaurantregistration_id: restaurant.id,
      rresponsible_id: restaurantResponsible.id,
    }, ['id'])
    .then((restaurantRes) => request(app).put(`${route}/${restaurantRes[0].id}`)
      .set('Authorization', `bearer ${responsibleRegistration.token}`)
      .send({
        name: 'Picanha Delight Grill',
        category: 'Comida de Picanha',
        desc: 'Restaurante de picanha situado em Braga',
        rphone: 253456789,
        location: 'Rua Gonçalo Sousa 285',
        image: 'https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg',
        numberoftables: 10,
        capacity: 200,
        openingdays: 'Aberto de segunda a sábado',
        averageprice: 28.75,
        openinghours: '11:30',
        closinghours: '23:30',
        restaurantregistration_id: restaurant.id,
        rresponsible_id: restaurantResponsible.id,
      }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Picanha Delight Grill');
      expect(res.body.category).toBe('Comida de Picanha');
    });
});

const request = require('supertest');
const uuid = require('uuid');

const app = require('../../src/app');

const route = '/reservations';

const generateUniqueEmailUser = () => `${uuid.v4()}@gmail.com`;
const generateUniqueEmailResponsible = () => `${uuid.v4()}@gmail.com`;

let userRes;
let user;
let restaurantRes;
let responsible;
let restaurant;

beforeAll(async () => {
  const userMail = generateUniqueEmailUser();

  const registerUser = await app.services.registeruser.save({
    username: 'joaorodrigues',
    email: userMail,
    password: 'Joao@12-BB',
  });
  userRes = { ...registerUser[0] };

  const createUser = await app.services.user.save({
    username: 'joaorodrigues',
    email: userMail,
    password: 'Joao@12-BB',
    image: null,
    registeruser_id: userRes.id,
  });
  user = { ...createUser };

  const responsibleMail = generateUniqueEmailResponsible();

  const registerRestaurant = await app.services.restaurantregistration.save({
    flname: 'joao moreira',
    phone: 999888888,
    email: responsibleMail,
    password: 'Joao@12-BB',
    name: 'la piola',
    category: 'comida italiana',
    desc: 'pizza pesto pasta',
    rphone: 253253253,
    location: 'braga',
    image: 'https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg',
    numberoftables: 20,
    capacity: 100,
    openingdays: 'segunda-sexta',
    averageprice: 17,
    openinghours: '12:00',
    closinghours: '23:00',
  });

  restaurantRes = { ...registerRestaurant[0] };

  const registerResponsible = await app.services.restaurantresponsible.save({
    flname: 'joao moreira',
    phone: 999888888,
    email: responsibleMail,
    password: 'Joao@12-BB',
    restaurantregistration_id: restaurantRes.id,
  });

  responsible = { ...registerResponsible[0] };

  const createRestaurant = await app.services.restaurant.save({
    name: 'la piola',
    category: 'comida italiana',
    desc: 'pizza pesto pasta',
    rphone: 253253253,
    location: 'braga',
    image: 'https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg',
    numberoftables: 20,
    capacity: 100,
    openingdays: 'segunda-sexta',
    averageprice: 17,
    openinghours: '12:00',
    closinghours: '23:00',
    restaurantregistration_id: restaurantRes.id,
    rresponsible_id: responsible.id,
  });
  restaurant = { ...createRestaurant };
});

test('Test #93 - Listar Reservas', () => {
  return request(app).get(route)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #94 - Listar Reservas por ID', () => {
  return app.db('reservations')
    .insert({
      client_name: 'Joao Rodrigues JR10',
      phonenumber: 911111114,
      reservationdate: '2023-12-15',
      reservationtime: '20:30:00',
      numberpeople: 7,
      restaurant_id: restaurant.id,
      user_id: user.id,
    }, ['id'])
    .then((reserv) => request(app).get(`${route}/${reserv[0].id}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.client_name).toBe('Joao Rodrigues JR10');
    });
});

test('Test #95 - Inserir Reservas', () => {
  return request(app)
    .post(route)
    .send({
      client_name: 'Joao Rodrigues JR1',
      phonenumber: 911111111,
      reservationdate: '2023-12-15',
      reservationtime: '20:30:00',
      numberpeople: 4,
      restaurant_id: restaurant.id,
      user_id: user.id,
    })
    .then((res) => {
      expect(res.status).toBe(201);
    });
});

describe('Validação de criar uma reserva', () => {
  const testTemplate = (newData, errorMessage) => {
    return request(app).post(route)
      .send({
        client_name: 'Joao Rodrigues JR1',
        phonenumber: 911111111,
        reservationdate: '2023-12-15',
        reservationtime: '20:30:00',
        numberpeople: 4,
        restaurant_id: restaurant.id,
        user_id: user.id,
        ...newData,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(errorMessage);
      });
  };

  test('Test #96 - Inserir Reservas sem Nome do cliente', () => testTemplate({ client_name: null }, 'Primeiro e último nome é um atributo obrigatório!'));
  test('Test #97 - Inserir Reservas sem Número de Telefone', () => testTemplate({ phonenumber: null }, 'Número de telefone é um atributo obrigatório!'));
  test('Test #98 - Inserir Reservas sem Data de Reserva', () => testTemplate({ reservationdate: null }, 'Data é um atributo obrigatório!'));
  test('Test #99 - Inserir Reservas sem Hora de Reserva', () => testTemplate({ reservationtime: null }, 'Hora é um atributo obrigatório!'));
  test('Test #100 - Inserir Reservas sem Número de Pessoas', () => testTemplate({ numberpeople: null }, 'Número de pessoas é um atributo obrigatório!'));
});

test('Test #101 - Modificar uma Reservas por ID', () => {
  return app.db('reservations')
    .insert({
      client_name: 'Joao Rodrigues JR12',
      phonenumber: 911111114,
      reservationdate: '2023-12-15',
      reservationtime: '20:30:00',
      numberpeople: 7,
      restaurant_id: restaurant.id,
      user_id: user.id,
    }, ['id'])
    .then((reserv) => request(app).put(`${route}/${reserv[0].id}`)
      .send({ numberpeople: 8 })
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.client_name).toBe('Joao Rodrigues JR12');
        expect(res.body.numberpeople).toBe(8);
      }));
});

test('Test #102 - Eliminar uma Reserva', () => {
  let reservationId;
  return app.db('reservations')
    .insert({
      client_name: 'Joao Rodrigues JR11',
      phonenumber: 911111114,
      reservationdate: '2023-12-15',
      reservationtime: '20:30:00',
      numberpeople: 7,
      restaurant_id: restaurant.id,
      user_id: user.id,
    }, ['id'])
    .then((reserv) => {
      reservationId = reserv[0].id;
      return request(app).delete(`${route}/${reservationId}`);
    })
    .then((res) => {
      expect(res.status).toBe(204);
      return app.db('reservations').where('id', reservationId).first();
    })
    .then((deletedReservation) => {
      expect(deletedReservation).toBeFalsy();
    });
});

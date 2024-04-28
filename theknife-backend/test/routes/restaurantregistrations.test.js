const request = require('supertest');
const uuid = require('uuid');

const app = require('../../src/app');

const route = '/restaurantregistrations';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

test('Test #1 - Listar todos os restaurantes registados', () => {
  return request(app).get(route)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #2 - Listar um restaurante por ID', () => {
  const mail = generateUniqueEmail();

  return app.db('restaurantregistrations')
    .insert({
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
    }, ['id'])
    .then((restaurantRes) => request(app).get(`${route}/${restaurantRes[0].id}`))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.flname).toBe('Rui Barreto');
    });
});

test('Test #3 - Inserir registo de restaurantes', () => {
  const mail = generateUniqueEmail();

  return request(app).post(route)
    .send({
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
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('La Gusto Italiano');
      expect(res.body).not.toHaveProperty('password');
    });
});

test('Test #3.1 - Guardar password encriptada', async () => {
  const mail = generateUniqueEmail();

  const res = await request(app).post(route)
    .send({
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

  expect(res.status).toBe(201);

  const { id } = res.body;
  const restaurantRegistrationDB = await app.services.restaurantregistration.find({ id });
  expect(restaurantRegistrationDB.password).not.toBeUndefined();
  expect(restaurantRegistrationDB.password).not.toBe('12345');
});

describe('Validação de criar um registo de um restaurante', () => {
  const mail = generateUniqueEmail();

  const testTemplate = (newData, errorMessage) => {
    return request(app).post(route)
      .send({
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
        ...newData,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(errorMessage);
      });
  };

  test('Test #4 - Inserir um registo de restaurante sem o nome do responsável do restaurante', () => testTemplate({ flname: null }, 'Nome do responsável do restaurante obrigatório!'));
  test('Test #5 - Inserir um registo de restaurante sem o telemóvel do responsável do restaurante', () => testTemplate({ phone: null }, 'Telemóvel do responsável do restaurante obrigatório!'));
  test('Test #6 - Inserir um registo de restaurante sem o email do responsável do restaurante', () => testTemplate({ email: null }, 'Email do responsável do restaurante obrigatório!'));
  test('Test #7 - Inserir um registo de restaurante sem a password do responsável do restaurante', () => testTemplate({ password: null }, 'Password do responsável do restaurante obrigatório!'));
  test('Test #8 - Inserir um registo de restaurante sem o nome do restaurante', () => testTemplate({ name: null }, 'Nome do restaurante é um atributo obrigatório!'));
  test('Test #9 - Inserir um registo de restaurante sem a categoria do restaurante', () => testTemplate({ category: null }, 'Categoria do restaurante é um atributo obrigatório!'));
  test('Test #10 - Inserir um registo de restaurante sem a descrição do restaurante', () => testTemplate({ desc: null }, 'Descrição do restaurante é um atributo obrigatório!'));
  test('Test #11 - Inserir um registo de restaurante sem o telefone do restaurante', () => testTemplate({ rphone: null }, 'Telefone do restaurante é um atributo obrigatório!'));
  test('Test #12 - Inserir um registo de restaurante sem a localização do restaurante', () => testTemplate({ location: null }, 'Localização do restaurante é um atributo obrigatório!'));
  test('Test #13 - Inserir um registo de restaurante sem uma imagem do restaurante', () => testTemplate({ image: null }, 'Imagem do restaurante é um atributo obrigatório!'));
  test('Test #14 - Inserir um registo de restaurante sem o número de mesas do restaurante', () => testTemplate({ numberoftables: null }, 'Número de mesas do restaurante é um atributo obrigatório!'));
  test('Test #15 - Inserir um registo de restaurante sem a capacidade do restaurante', () => testTemplate({ capacity: null }, 'Capacidade do restaurante é um atributo obrigatório!'));
  test('Test #16 - Inserir um registo de restaurante sem os dias de funcionamento', () => testTemplate({ openingdays: null }, 'Dias de funcionamento são um atributo obrigatório!'));
  test('Test #17 - Inserir um registo de restaurante sem o preço médio', () => testTemplate({ averageprice: null }, 'Preço médio é um atributo obrigatório!'));
  test('Test #18 - Inserir um registo de restaurante sem as horas de abertura', () => testTemplate({ openinghours: null }, 'Horas de abertura são um atributo obrigatório!'));
  test('Test #19 - Inserir um registo de restaurante sem as horas de fecho', () => testTemplate({ closinghours: null }, 'Horas de fecho são um atributo obrigatório!'));
});

test('Test #20 - Verificação de email que existe', async () => {
  const existingEmail = 'ea96fe22-0601-417d-920b-678d76415d3e@gmail.com';

  const confirmationEmailResponse = await request(app).get(`/restaurantregistrations/confirm-email/${existingEmail}`);

  expect(confirmationEmailResponse.status).toBe(200);
  expect(confirmationEmailResponse.body.message).toBe('Email confirmado com sucesso!');
});

test('Test #21 - Verificação de email que não existe', async () => {
  const nonexistentEmail = 'emailquenaoexiste@gmail.com';

  const confirmationEmailResponse = await request(app).get(`/restaurantregistrations/confirm-email/${nonexistentEmail}`);

  expect(confirmationEmailResponse.status).toBe(404);
  expect(confirmationEmailResponse.body.error).toBe('Email não encontrado!');
});

test('Test #22 - Inserir e confirmar a Palavra Passe', async () => {
  const mail = generateUniqueEmail();

  const registrationResponse = await request(app).post(route)
    .send({
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

  expect(registrationResponse.status).toBe(201);

  const updatePasswordResponse = await request(app).put(`${route}/${registrationResponse.body.email}/updatepassword`)
    .send({
      newPassword: 'Rui@13-AA',
      confirmNewPassword: 'Rui@13-AA',
    });

  expect(updatePasswordResponse.status).toBe(200);
  expect(updatePasswordResponse.body.message).toBe('Palavra Passe atualizada com sucesso!');
});

test('Test #23 - Inserir Palavras Passes diferentes', async () => {
  const mail = generateUniqueEmail();

  const registrationResponse = await request(app).post(route)
    .send({
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

  expect(registrationResponse.status).toBe(201);

  const updatePasswordResponse = await request(app).put(`${route}/${registrationResponse.body.email}/updatepassword`)
    .send({
      newPassword: 'Rui@13-AA',
      confirmNewPassword: 'Rui@14-AA',
    });

  expect(updatePasswordResponse.status).toBe(400);
  expect(updatePasswordResponse.body.error).toBe('A Palavra Passe deve ser igual nos dois campos!');
});

test('Test #24 - Atualizar dados de um registo de um restaurante', () => {
  const mail = generateUniqueEmail();

  return app.db('restaurantregistrations')
    .insert({
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
    }, ['id'])
    .then((restaurantRes) => request(app).put(`${route}/${restaurantRes[0].id}`)
      .send({
        flname: 'Rui Barreto',
        phone: 912345678,
        email: mail,
        password: 'Rui@12-BB',
        name: 'Picanha Delight Grill',
        category: 'Comida de Picanha',
        desc: 'Restaurante de picanha situado em Braga',
        rphone: 253456789,
        location: 'Rua Gonçalo Sousa 285',
        image: 'https://t4.ftcdn.net/jpg/02/94/26/33/360_F_294263329_1IgvqNgDbhmQNgDxkhlW433uOFuIDar4.jpg',
        numberoftables: 10,
        capacity: 150,
        openingdays: 'Aberto de segunda a sábado',
        averageprice: 28.75,
        openinghours: '11:30',
        closinghours: '23:30',
      }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Picanha Delight Grill');
      expect(res.body.desc).toBe('Restaurante de picanha situado em Braga');
      expect(res.body).not.toHaveProperty('password');
    });
});

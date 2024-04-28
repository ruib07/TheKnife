const request = require('supertest');
const uuid = require('uuid');

const app = require('../../src/app');

const route = '/contacts';

const generateUniqueEmail = () => `${uuid.v4()}@gmail.com`;

test('Test #76 - Obter todos os contatos', async () => {
  const getAllResponse = await request(app).get(route);
  expect(getAllResponse.status).toBe(200);
  expect(Array.isArray(getAllResponse.body)).toBe(true);
  expect(getAllResponse.body.length).toBeGreaterThan(0);
  expect(getAllResponse.body[0]).toHaveProperty('id');
});

test('Test #77 - Obter contato por ID', async () => {
  const contactId = 1;
  const response = await request(app).get(`${route}/${contactId}`);
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('id', contactId);
});

test('Test #78 - Inserir dados de contacto', async () => {
  const mail = generateUniqueEmail();

  const contactData = {
    name: 'GoncaloCoutinho',
    email: mail,
    phoneNumber: 123456789,
    subject: 'Test subject',
    message: 'Test message',
  };

  const createResponse = await request(app)
    .post(route)
    .send(contactData);

  expect(createResponse.status).toBe(201);
  expect(createResponse.body).toHaveProperty('id');
  expect(createResponse.body.name).toBe(contactData.name);
  expect(createResponse.body.email).toBe(contactData.email);
  expect(createResponse.body.phoneNumber).toBe(contactData.phoneNumber);
  expect(createResponse.body.subject).toBe(contactData.subject);
  expect(createResponse.body.message).toBe(contactData.message);
});

describe('Validação de criar um contacto', () => {
  const mail = generateUniqueEmail();

  const testTemplate = (newData, errorMessage) => {
    return request(app).post(route)
      .send({
        name: 'GoncaloCoutinho',
        email: mail,
        phoneNumber: 123456789,
        subject: 'Test subject',
        message: 'Test message',
        ...newData,
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(errorMessage);
      });
  };

  test('Test #79 - Inserir um contacto sem nome', () => testTemplate({ name: null }, 'Preencha todos os campos obrigatórios!'));
  test('Test #80 - Inserir um contacto sem email', () => testTemplate({ email: null }, 'Preencha todos os campos obrigatórios!'));
  test('Test #81 - Inserir um contacto sem telefone', () => testTemplate({ phoneNumber: null }, 'Preencha todos os campos obrigatórios!'));
  test('Test #82 - Inserir um contacto sem assunto', () => testTemplate({ subject: null }, 'Preencha todos os campos obrigatórios!'));
  test('Test #83 - Inserir um contacto sem mensagem', () => testTemplate({ message: null }, 'Preencha todos os campos obrigatórios!'));
});

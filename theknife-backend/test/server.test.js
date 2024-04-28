const supertest = require('supertest');

const request = supertest('http://localhost:3001');

test.skip('Validar se o servidor responde no porto 3001', () => request.get('/')
  .then((res) => expect(res.status).toBe(200)));

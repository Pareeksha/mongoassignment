
const request = require('supertest');
const app = require('./app');
const MongoClient = require('mongodb/lib/mongo_client');
const url=require('./secret.js');


beforeAll(async () => {
   const connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('people');
    
    
  });
  
  

app.route('/users')
describe('GET /users', () => {
  test('returning user list', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /users', () => {
  test('add new user', async () => {
    const newUser = { name: 'Luna' };
    const response = await request(app)
      .post('/users')
      .send(newUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(newUser.name);
  });
});

describe('PUT /users', () => {
  test('updating a user', async () => {
    const updatedUser = { _id: '646dc12df0ee2a4738453d59', name: 'Tomioka' };
    const response = await request(app)
      .put('/users')
      .send(updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
  });
});


afterAll(async () => {
    const connection = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
     await connection.close();
  });

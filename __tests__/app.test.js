process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');

describe('api', () => {
  afterAll(() => {
    return connection.destroy();
  });
  beforeEach(() => {
    return connection.seed.run();
  });
  describe('/users', () => {
    test('GET - 200 returns all users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).toBe(2);
          expect(body.users[0]).toEqual({
            first_name: 'Marta',
            last_name: 'Moreno',
            username: 'butter_bridge',
            phone_number: '07367961308',
            house_number: 22,
            street_name: 'Vesper Gate Drive',
            postcode: 'LS53NH',
            city: 'Leeds',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk03',
          });
        });
    });

    test('POST - 201 accepts an new user object and returns with posted user', () => {
      return request(app)
        .post('/api/users')
        .send({
          newUser: {
            first_name: 'Martin',
            last_name: 'Moreman',
            username: 'butter_tunnel',
            phone_number: '07367963912',
            house_number: 25,
            street_name: 'Nesper Date Grive',
            postcode: 'LS54FD',
            city: 'Lincoln',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk05',
          },
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.newUser).toEqual({
            first_name: 'Martin',
            last_name: 'Moreman',
            username: 'butter_tunnel',
            phone_number: '07367963912',
            house_number: 25,
            street_name: 'Nesper Date Grive',
            postcode: 'LS54FD',
            city: 'Lincoln',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk05',
          });
        });
    });
  });

  describe('/users/:uid', () => {
    test('GET - 200 returns correct user by uid - A', () => {
      return request(app)
        .get('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk03')
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toEqual({
            first_name: 'Marta',
            last_name: 'Moreno',
            username: 'butter_bridge',
            phone_number: '07367961308',
            house_number: 22,
            street_name: 'Vesper Gate Drive',
            postcode: 'LS53NH',
            city: 'Leeds',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk03',
          });
        });
    });

    test('GET - 200 returns correct user by uid - B', () => {
      return request(app)
        .get('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk04')
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toEqual({
            first_name: 'Peter',
            last_name: 'Parker',
            username: 'owais1996',
            phone_number: '07712268504',
            house_number: 59,
            street_name: 'Leighbrook Road',
            postcode: 'M146DW',
            city: 'Manchester',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk04',
          });
        });
    });

    test('PATCH - 201 accepts new data and returns the updated user', () => {
      return request(app)
        .patch('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk04')
        .send({
          editUser: {
            first_name: 'Lad',
            last_name: 'McLadderson',
            username: 'Lad1999',
            phone_number: '666',
            house_number: 59,
            street_name: 'Leighbrook Road',
            postcode: 'M146DW',
            city: 'Manchester',
          },
        })
        .expect(202)
        .then(({ body }) => {
          expect(body.editedUser).toEqual({
            first_name: 'Lad',
            last_name: 'McLadderson',
            username: 'Lad1999',
            phone_number: '666',
            house_number: 59,
            street_name: 'Leighbrook Road',
            postcode: 'M146DW',
            city: 'Manchester',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk04',
          });
        })
        .then(() => {
          return request(app)
            .get('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk04')
            .expect(200)
            .then(({ body }) => {
              expect(body.user).toEqual({
                first_name: 'Lad',
                last_name: 'McLadderson',
                username: 'Lad1999',
                phone_number: '666',
                house_number: 59,
                street_name: 'Leighbrook Road',
                postcode: 'M146DW',
                city: 'Manchester',
                uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk04',
              });
            });
        });
    });

    test('DELETE - 204', () => {
      return request(app)
        .delete('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk03')
        .expect(204)
        .then(() => {
          return request(app)
            .get('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk03')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe('User not found');
            });
        });
    });
  });
  describe('/users/:uid/contacts', () => {
    test('GET - 200 returns array of contacts', () => {
      return request(app)
        .get('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk03/contacts')
        .expect(200)
        .then(({ body }) => {
          expect(body.contacts.length).toBe(2);
          expect(body.contacts).toEqual([
            {
              contact_id: 1,
              first_name: 'Alba',
              last_name: 'Mateos',
              phone_number: '07367961308',
              relationship_user: 'friend',
              house_number: 35,
              street_name: 'Vesper Gate Drive',
              postcode: 'LS53NH',
              city: 'Leeds',
              uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk03',
            },
            {
              contact_id: 2,
              first_name: 'Owais',
              last_name: 'Khalid',
              phone_number: '07712268504',
              relationship_user: 'brother',
              house_number: 12,
              street_name: 'Leighbrook Road',
              postcode: 'M146DW',
              city: 'Manchester',
              uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk03',
            },
          ]);
        });
    });
    test('POST - 201 accepts an new contact object and returns with posted contact', () => {
      return request(app)
        .post('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk03/contacts')
        .send({
          newContact: {
            first_name: 'jeff',
            last_name: 'chips',
            phone_number: '666',
            relationship_user: 'lad',
            house_number: 1,
            street_name: 'your mas house',
            postcode: 'M1 1Lad',
            city: 'ladchester',
          },
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.newContact).toEqual({
            contact_id: 5,
            first_name: 'jeff',
            last_name: 'chips',
            phone_number: '666',
            relationship_user: 'lad',
            house_number: 1,
            street_name: 'your mas house',
            postcode: 'M1 1Lad',
            city: 'ladchester',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk03',
          });
        });
    });
  });
  describe('/users/:uid/contacts/contact_id', () => {
    test('GET - 200 gets a single contact by id - A ', () => {
      return request(app)
        .get('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk03/contacts/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.contact).toEqual({
            contact_id: 1,
            first_name: 'Alba',
            last_name: 'Mateos',
            phone_number: '07367961308',
            relationship_user: 'friend',
            house_number: 35,
            street_name: 'Vesper Gate Drive',
            postcode: 'LS53NH',
            city: 'Leeds',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk03',
          });
        });
    });
    test('GET - 200 gets a single contact by id - B ', () => {
      return request(app)
        .get('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk04/contacts/3')
        .expect(200)
        .then(({ body }) => {
          expect(body.contact).toEqual({
            contact_id: 3,
            first_name: 'Alan',
            last_name: 'Harrison',
            phone_number: '07789843455',
            relationship_user: 'cousin',
            house_number: 48,
            street_name: 'Oxford Road',
            postcode: 'M15DW',
            city: 'Manchester',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk04',
          });
        });
    });

    test('PATCH - 201 accepts new data and returns the updated contact', () => {
      return request(app)
        .patch('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk04/contacts/3')
        .send({
          editContact: {
            contact_id: 3,
            first_name: 'Lad',
            last_name: 'Laddison',
            phone_number: '666',
            relationship_user: 'lad',
            house_number: 48,
            street_name: 'Oxford Road',
            postcode: 'M15DW',
            city: 'Manchester',
          },
        })
        .expect(202)
        .then(({ body }) => {
          expect(body.editedContact).toEqual({
            contact_id: 3,
            first_name: 'Lad',
            last_name: 'Laddison',
            phone_number: '666',
            relationship_user: 'lad',
            house_number: 48,
            street_name: 'Oxford Road',
            postcode: 'M15DW',
            city: 'Manchester',
            uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk04',
          });
        })
        .then(() => {
          return request(app)
            .get('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk04/contacts/3')
            .expect(200)
            .then(({ body }) => {
              expect(body.contact).toEqual({
                contact_id: 3,
                first_name: 'Lad',
                last_name: 'Laddison',
                phone_number: '666',
                relationship_user: 'lad',
                house_number: 48,
                street_name: 'Oxford Road',
                postcode: 'M15DW',
                city: 'Manchester',
                uid: 'ouq2Vs5hq4afIZiEBV0wIUb8Fk04',
              });
            });
        });
    });
    test('DELETE - 204', () => {
      return request(app)
        .delete('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk03/contacts/1')
        .expect(204)
        .then(() => {
          return request(app)
            .get('/api/users/ouq2Vs5hq4afIZiEBV0wIUb8Fk03/contacts/1')
            .expect(404)
            .then(({ body }) => {
              expect(body.msg).toBe('Contact not found');
            });
        });
    });
  });
});

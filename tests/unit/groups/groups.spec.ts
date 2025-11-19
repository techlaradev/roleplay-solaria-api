import { test } from "@japa/runner";
import { UserFactory } from "#database/factories/index_factory";
import User from "#models/users";
import supertest from "supertest";

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group('groups flow', (group) => {
  let token: string
  let user: User

  group.each.setup(async () => {
    const plainPassword = "123456789";

    user = await UserFactory.merge({ password: plainPassword }).create();

    const tokenResponse = await supertest(BASE_URL)
      .post('/user-sessions')
      //.set('Authorization', `Bearer ${token}`)
      .send({
        email: user.email,
        password: plainPassword
      })
      .expect(201);

    token = tokenResponse.body.token.token;

    console.log('🔑 User:', user.email, 'Token:', token);
  });

  group.each.teardown(async () => {
const { body } = await supertest(BASE_URL)
  .delete('/user-sessions').set
    console.log('executed after the test');

  });

  test('it should create a group', async ({ assert }) => {
    const groupPayload = {
      name: 'HEXACOMBE',
      description: 'Teste de criar mesinhas hauhasu',
      schedule: 'todos os dias as 20h',
      location: 'casa da sua mae',
      chronic: 'de Narnia, uma jornada de ferrar o bardo',
      master: user.id
    };

    const { body } = await supertest(BASE_URL)
      .post('/groups')
      .set('Authorization', `Bearer ${token}`) // usa o token gerado
      .send(groupPayload)
      .expect(201);

    assert.exists(body.group, 'Group undefined');
    assert.equal(body.group.name, groupPayload.name);
    assert.equal(body.group.master, groupPayload.master);
  });

  test('it should return 422 when required data is not provided', async ({ assert }) => {
    const { body } = await supertest(BASE_URL)
      .post('/groups')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(422);

    assert.equal(body.code, 'BAD_REQUEST');
    assert.equal(body.status, '422');
  });

  test('it should create a group and includes a master as a player', async ({ assert }) => {
    const groupPayload = {
      name: 'HEXACOMBE',
      description: 'Teste de criar mesinhas hauhasu',
      schedule: 'todos os dias as 20h',
      location: 'casa da sua mae',
      chronic: 'de Narnia, uma jornada de ferrar o bardo',
      master: user.id
    };

    const { body } = await supertest(BASE_URL)
      .post('/groups')
      .set('Authorization', `Bearer ${token}`)
      .send(groupPayload)
      .expect(201);

    assert.exists(body.group, 'Group undefined');
    assert.isArray(body.group.players, 'Players is not an array');
    assert.equal(body.group.players.length, 1);
    assert.equal(body.group.players[0].id, groupPayload.master);
  });


});

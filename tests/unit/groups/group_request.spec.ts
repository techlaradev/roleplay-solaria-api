import { test } from "@japa/runner";
import { GroupFactory, UserFactory } from "#database/factories/index_factory";
import User from "#models/users";
import supertest from "supertest";

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;

test.group('group`s request flow', (group) => {
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


  test('It should create a request for join a Group',async ({assert}) => {

    const {id} = await UserFactory.create()
    const group = await GroupFactory.merge({master: id}).create()

   const {body} = await supertest(BASE_URL)
    .post(`/groups/${group.id}/requests`)
    .set('Authorization', `Bearer ${token}`)
    .send({})
    .expect(201)


    console.log(body, 'body')
console.log(body.groupRequest, 'groupRequest')


  assert.exists(body.groupRequest,'group request undefined')
  assert.equal(body.groupRequest.userId, user.id)
  assert.equal(body.groupRequest.groupId, group.id)
  assert.equal(body.groupRequest.status, 'PENDING')

  })


})

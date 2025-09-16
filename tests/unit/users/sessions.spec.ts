import { UserFactory } from "#database/factories/index_factory";
import { test } from "@japa/runner";
import supertest from "supertest";

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Session',(group) => {
  
 group.each.setup(async () => {
  })

  group.each.teardown(() => {
  })

 test('it should autenticate an user', async ({assert}) =>{
    
    const plainPassword = 'test1235';
    const {id,email} = await UserFactory.merge({password:plainPassword}).create()
    
    
    const { body } = await supertest(BASE_URL)
    .post('/user-sessions')
    .send({
        email,
        password: plainPassword
    })
    .expect(201)

    assert.isDefined(body.user, 'user undefined')
    assert.equal(body.user.id, id)
 })

})
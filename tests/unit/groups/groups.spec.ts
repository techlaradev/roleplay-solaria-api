
import { UserFactory } from "#database/factories/index_factory";
import { test } from "@japa/runner";
import supertest from "supertest";



const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
test.group('groups flow', (group) => {

 group.each.setup(() => {
    console.log('executed before the test')
  })

  group.each.teardown(() => {
    console.log('executed after the test')
  })

  test('it should create a group',async ({assert}) => {

    const user = await UserFactory.create()
    const groupPayload = {
      name: 'HEXACOMBE',
      description: 'Teste de criar mesinhas hauhasu',
      schedule: 'todos os dias ás 20h',
      location: 'casa da sua mãe',
      chronic: 'de Nárnia',
      master:user.id
    }
   const {body} = await supertest(BASE_URL)
   .post('/groups').send(groupPayload).expect(201)

   assert.exists(body.group, 'Group undefined')
   assert.equal(body.group.name, groupPayload.name)
   assert.equal(body.group.description, groupPayload.description)
   assert.equal(body.group.schedule,groupPayload.schedule)
   assert.equal(body.group.location,groupPayload.location)
   assert.equal(body.group.chronic,groupPayload.chronic)
   assert.equal(body.group.master,groupPayload.master)

    })
   test('it should return 422 when required data is not provided', async({assert}) => {
   const {body} = await supertest(BASE_URL).post('/groups').send({}).expect(422)

    assert.equal(body.code,'BAD_REQUEST')
    assert.equal(body.status,'422')
   })

  })


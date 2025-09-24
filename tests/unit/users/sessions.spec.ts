import { UserFactory } from "#database/factories/index_factory";
import { test } from "@japa/runner";
import supertest from "supertest";
import User from "#models/users";

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



  test('it should return an api token when session is created', async ({assert}) =>{
    
    const plainPassword = 'test1235';
    const {id,email} = await UserFactory.merge({password:plainPassword}).create()
    
    
    const { body } = await supertest(BASE_URL)
    .post('/user-sessions')
    .send({
        email,
        password: plainPassword
    })
    .expect(201)
    
    assert.equal(body.user.id, id)

    assert.isDefined(body.token, 'Token undefined')
    assert.equal(body.token.type, 'bearer')
 })


 
  test('it should return 400 when credentials are not provided', async ({}) =>{
    
   // const plainPassword = 'test1235';
    //const {id,email} = await UserFactory.merge({password:plainPassword}).create()
    
    
    await supertest(BASE_URL)
    .post('/user-sessions')
    .send({})
    .expect(400)
    
    // assert.equal(body.user.id, id)

    // assert.isDefined(body.token, 'Token undefined')
    // assert.equal(body.token.type, 'bearer')
 })

  test('it should return 400 when credentials are Invalid', async ({assert}) =>{
    
   
    const {email} = await UserFactory.create()
    
    
    const { body } = await supertest(BASE_URL)
    .post('/user-sessions')
    .send({
        email,
        password:'testeresponsa'
    })
    .expect(400)
    
    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 400)
 })


 test('it should return 200 when the user logout', async ({assert}) => {
 const plainPassword = 'test1235';
    const {id,email} = await UserFactory.merge({password:plainPassword}).create()
    
    
    const { body } = await supertest(BASE_URL)
    .post('/user-sessions')
    .send({
        email,
        password: plainPassword
    })
    .expect(201)

    const apiToken = body.token

    await supertest(BASE_URL)
    .delete('/user-sessions')
    .set('Authorization', `Bearer ${apiToken.token}`)
    .expect(200)

    assert.isDefined(body.user, 'user undefined')
    assert.equal(body.user.id, id)


})

test('it should revoke token when the user logout', async ({assert}) => {
 const plainPassword = 'test1235';
    const user = await UserFactory.merge({password:plainPassword}).create()
    
    
    const { body } = await supertest(BASE_URL)
    .post('/user-sessions')
    .send({
        email: user.email,
        password: plainPassword
    })
    .expect(201)

    const apiToken = body.token

    console.log('console logo token antes de deslogar',body.token)
   assert.isDefined(apiToken, 'Deve existir pelo menos 1 token após login')

    //verificando se o token foi mesmo, mas antes de deslogar
        // Recarrega o usuário e seus tokens
  const tokenBefore = await User.findOrFail(user.id)
  await tokenBefore.load('token') // ou 'accessTokens', dependendo do relacionamento

  console.log('token b4',{tokenBefore})

    await supertest(BASE_URL)
    .delete('/user-sessions')
    .set('Authorization', `Bearer ${apiToken.token}`)
    .expect(200)
    
    // Recarrega o usuário e seus tokens
  const refreshedUser = await User.findOrFail(user.id)
  await refreshedUser.load('token') // ou 'accessTokens', dependendo do relacionamento

    console.log ('refreshedUser',{refreshedUser})
  const refreshedTokens = await user.related('token').query()
  assert.isEmpty(refreshedTokens, 'Todos os tokens devem ter sido revogados após logout')

})


 })


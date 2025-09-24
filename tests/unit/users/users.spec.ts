import { test } from '@japa/runner'
import supertest from 'supertest'
import { UserFactory } from '#database/factories/index_factory'
import { faker } from '@faker-js/faker'
import hash from '@adonisjs/core/services/hash'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
let token = '';

test.group('User flow', (group) => {

  //hooks
  group.setup(async ()=> {
    
  const plainPassword = "123456789"

  const {email} = await UserFactory.merge({password: plainPassword}).create() // aqui ele cria uma senha e um id como pré-existente

  //logando, para poder alterar o usuário, é preciso do token
    const loginResponse = await supertest(BASE_URL).post('/user-sessions').send({
      email: email,
      password: plainPassword,
    })

     token = loginResponse.body.token.token
  })
  group.each.setup(() => {
    console.log('executed before the test')
  })

  group.each.teardown(() => {
    console.log('executed after the test')
  })

  test('it should create a user', async ({assert}) => { // por algum motivo obscuro o assert tem que ficar com { chaves}
    const userPayload = {
      name: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
      avatar: 'https://files.tecnoblog.net/wp-content/uploads/2023/12/exemplo-imagen-2-2.jpg',
    }

    const { body } = await supertest(BASE_URL)
      .post('/users')
      .send(userPayload)
      .expect(201)

    assert.exists(body.user.id)
    assert.equal(body.user.email, userPayload.email)
    assert.equal(body.user.name, userPayload.name)
    assert.notEqual(body.user.password, userPayload.password)
    //assert.equal(body.user.avatar, userPayload.avatar)

    console.log('executadah', body)
  })

  test('it should return 409 when the email is already in use', async ({assert}) => {
    const { email } = await UserFactory.create()
 


        const { body } = await supertest(BASE_URL)
      .post('/users')
      .send({
        name: faker.internet.username(),
        email,
        password: 'testeline',
      })
      .expect(409)
      console.log(body, 'this message')

      assert.include(body.message, 'email')
      assert.equal(body.code, 'BAD_REQUEST')
      assert.equal(body.status, 409)

  })


 test('it should return 409 when the username is already in use', async ({assert}) => {
    const { name } = await UserFactory.create()
 
        const { body } = await supertest(BASE_URL)
      .post('/users')
      .send({
        name,
        email: faker.internet.email(),
        password: 'testelin',
      })
      .expect(409)
            console.log(body, 'this message')

      assert.include(body.message, 'name')
      assert.equal(body.status, 409)

  })

  test('it should show when the data is required but not provided', async ({assert}) => { // rodar o 422, entidade não processada, vou ter que usar um novo exception, crtz

    const { body } = await supertest(BASE_URL)
    .post('/users')
    .send({})
    .expect(422)

    assert.equal(body.code,'BAD_REQUEST')
    assert.equal(body.status, 422)

  }
)

  test('it should return when tha email is invalid', async ({assert}) => { // rodar o 422, entidade não processada, vou ter que usar um novo exception, crtz

      const { body } = await supertest(BASE_URL)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name:'Lalazuli',
        email: 'janela-janelinha-porta-campainha',
        password: 'testeline',
      })
      .expect(422)
      
      assert.include(body.code, 'BAD_REQUEST')
      assert.equal(body.status, 422)
      

      }
    )

  test('it should return when tha password is invalid', async ({assert}) => { // rodar o 422, entidade não processada, vou ter que usar um novo exception, crtz
  const { body } = await supertest(BASE_URL)
      .post('/users')
      .send({
        name : 'lalazuli',
        email: 'test2@test.com',
        password: '123',
      })
      .expect(422)
      
      assert.include(body.code, 'BAD_REQUEST')
      assert.equal(body.status, 422)

  }
)
// processes that envolves updating an user data

test('it should update an existent user', async({assert}) =>{

  const plainPassword = "123456789"

  const user = await UserFactory.merge({password: plainPassword}).create() // aqui ele cria uma senha e um id como pré-existente
  
  const email = faker.internet.email()
  const avatar = 'https://github.com/techlaradev'

  const { body } = await supertest(BASE_URL) 
    .put(`/users/${user.id}`) 
    .set('Authorization', `Bearer ${token}`)
    .send({
      email,
      avatar,
      password: 'Janelajani',
    })
    .expect(200) //sucesso


          assert.exists(body.user, 'User undefined')
          assert.equal(body.user.email, email)
          assert.equal(body.user.avatar, avatar)
          assert.equal(body.user.id, user.id)



}
)

test('it should change the user´s password', async ({assert}) =>{

  const user = await UserFactory.create() // aqui ele cria uma senha e um id como pré-existente
  const password = 'testelina1234'

   const { body } = await supertest(BASE_URL) 
    .put(`/users/${user.id}`) // busca o usuário na rota
    .set('Authorization', `Bearer ${token}`)
    .send({
      email: user.email,
      avatar: user.avatar,
      password,
    })
    .expect(200) //sucesso

          assert.exists(body.user, 'User undefined')
          assert.equal(body.user.id, user.id)
        
        // aqui estamos fazendo uma verificação de senha, como a nossa senha está criptografada, eu vou precisar do hash aqui
        await user.refresh()  
        assert.isTrue(await hash.verify(user.password, password))

      })


test('it should return a 422 when required data is not provided' , async ({assert}) =>{
const {id} = await UserFactory.create() // aqui ele cria uma senha e um id como pré-existente


   const { body } = await supertest(BASE_URL) 
    .put(`/users/${id}`) // busca o usuário na rota
    .set('Authorization', `Bearer ${token}`)
    .send({})
    .expect(422) //sucesso

    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)

})
test('it should return 422 when try to update email and is invalid', async  ({assert})=> {
const user = await UserFactory.create() // aqui ele cria um user mesmo
const email = 'joanita123-teste.com'

   const { body } = await supertest(BASE_URL) 
    .put(`/users/${user.id}`) // busca o usuário na rota
    .set('Authorization', `Bearer ${token}`)
    .send({
      email,
      password:user.password,
      avatar: user.avatar
    })
    .expect(422) //sucesso


    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)

})

test('it should return 422 when try to update and password is invalid', async  ({assert})=> {
const user = await UserFactory.create() // aqui ele cria um user mesmo
const oldPassword = user.password

   await supertest(BASE_URL) 
    .put(`/users/${user.id}`) // busca o usuário na rota
    .set('Authorization', `Bearer ${token}`)
    .send({
      email: user.email,
      password: 'fail',
      avatar: user.avatar
    })
    .expect(422)

    await user.refresh()
    assert.equal(user.password, oldPassword )


})

test('it should return 422 when try to update avatar and is invalid', async  ({assert})=> {
const {id, email, password} = await UserFactory.create()

   const { body } = await supertest(BASE_URL) 
    .put(`/users/${id}`) // busca o usuário na rota
    .set('Authorization', `Bearer ${token}`)
    .send({
      email,
      password,
      avatar: 'eae',
    })
    .expect(422) //sucesso


    assert.equal(body.code, 'BAD_REQUEST')
    assert.equal(body.status, 422)

})


})


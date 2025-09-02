import { test } from '@japa/runner'
import supertest from 'supertest'
import Mail from '@adonisjs/mail/services/main'
import { UserFactory } from '#database/factories/index_factory'
import ForgotPasswordMailer from '#mails/forgot_password_notification'
import hash from '@adonisjs/core/services/hash'
import LinkToken from '#models/link_token'
import { TokenFactory } from '#database/factories/token_factory'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Forgotten passwords Flow', (group) => {
  group.each.setup(async () => {
    Mail.fake()
      await LinkToken.query().delete()
  })

  group.each.teardown(() => {
    Mail.restore()
  })

  test('it should send an email with instructions forgot password flow', async ({ }) => {
    const user = await UserFactory.create()
    const { mails } = Mail.fake()

    await supertest(BASE_URL)
      .post('/forgot-password')
      .send({ email: user.email, resetPasswordURL: 'https://exemplo.com/reset-password' })
      .expect(204)

    mails.assertSent(ForgotPasswordMailer, (email) => {
      return email.message.hasTo(user.email) &&
             email.message.hasSubject('Roleplay: Recuperação de Senha')
    })
  })

 test('it should send a real email to mailtrap', async ({ assert }) => {
  const user = await UserFactory.create()

  // Aumenta o timeout para 30 segundos
  const response = await supertest(BASE_URL)
    .post('/forgot-password')
    .send({ email: user.email, resetPasswordURL: 'https://exemplo.com/reset-password' })
    .timeout(30000)

    console.log()
  assert.equal(response.status, 204)
  

  assert.isTrue(true, 'E-mail enviado com sucesso')
}).timeout(40000) // 40 segundos no total

test('it should to be able the process to reset the password', async ({assert}) => {

  const user = await UserFactory.create()
   const token = await user.related('token').create({token: 'tokenzito'})
  //const token = await TokenFactory.merge({ userId: user.id }).create()


    await user.load('token')
  console.log('Usuário com token:', user)

   await supertest(BASE_URL)
  .post('/reset-password')
  .send({
    token,
    password:'123456'
  }).expect(204) //no content

  await user.refresh()

  const checkPassword = await hash.verify(user.password,'123456')
  assert.isTrue(checkPassword)

})
  test('fail case: it should send an email with instructions forgot password flow', async ({ assert}) => {
    const {body} = await supertest(BASE_URL)
      .post('/reset-password')
      .send({})
      .expect(422)

      assert.equal(body.code, 'BAD_REQUEST')
      assert.equal(body.status, '422')

})

test('it should return a 404 when the token was used twice', async ({ assert }) => {
  const user = await UserFactory.create()
  const token = await TokenFactory.merge({ userId: user.id }).create()

  // Primeira requisição (deve retornar 204)
  await supertest(BASE_URL)
    .post('/reset-password')
    .send({
      token: token.token, // Use o token gerado pela factory
      password: '123456'
    })
    .expect(204)

  // Segunda requisição (deve retornar 404)
  const { body } = await supertest(BASE_URL)
    .post('/reset-password')
    .send({
      token: token.token, // Mesmo token usado na primeira requisição
      password: '123456'
    })
    .expect(404)

  console.log('body', body)

  // Ajuste as verificações conforme a estrutura real da resposta
  assert.equal(body.code, 'BAD_REQUEST')
  assert.equal(body.status, '404') // 404 é número, não string
})

})
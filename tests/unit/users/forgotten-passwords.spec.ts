import { test } from '@japa/runner'
import supertest from 'supertest'
import Mail from '@adonisjs/mail/services/main'
import { UserFactory } from '#database/factories/index_factory'
import ForgotPasswordMailer from '#mails/forgot_password_notification'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Forgotten passwords Flow', (group) => {
  group.each.setup(() => {
    Mail.fake()
  })

  group.each.teardown(() => {
    Mail.restore()
  })

  test('it should send an email with instructions forgot password flow', async ({ assert }) => {
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
})
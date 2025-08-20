import { UserFactory } from '#database/factories/index_factory'
import mail from '@adonisjs/mail/services/main'
import { test } from '@japa/runner'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Forgotten passwords Flow', (group) => {
  let mailerFake: ReturnType<typeof mail.fake>

  group.each.setup(() => {
    // ativa o fake antes de cada teste
    mailerFake = mail.fake()
    console.log('Mailer fake ativado')
  })

  group.each.teardown(() => {
    // restaura o mail após cada teste
    mail.restore()
    console.log('Mailer restaurado')
  })

  test('it should send an email with instructions forgot password flow', async ({ assert }) => {
    const user = await UserFactory.create()
    
    await supertest(BASE_URL)
    .post('/forgot-password')
    .send({
      email: user.email,
      resetPasswordURL: 'url',
    })
    .expect(204)
    
  
    
  })
})

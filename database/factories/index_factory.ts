import factory from '@adonisjs/lucid/factories'
import User from '#models/users'

export const UserFactory = factory
  .define(User, async ({faker}) => {
    return {
      name:faker.person.firstName(), // ao inves de usar o name depois de faker, estou usando o person
      email:faker.internet.email(),
      password:faker.internet.password(),
      avatar:faker.internet.url(),
    }
  })
  .build()
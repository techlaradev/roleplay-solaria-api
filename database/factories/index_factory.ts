import factory from '@adonisjs/lucid/factories'
import Group from '#models/group'
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

  export const GroupFactory = factory
  .define(Group, async ({faker}) => {
    return {
      name:faker.person.firstName(), // ao inves de usar o name depois de faker, estou usando o person
      description:faker.lorem.paragraph(),
      schedule:faker.date.weekday(),
      location:faker.internet.url(),
      chronic:faker.lorem.sentence(),
      master:undefined,
    }
  })
  .build()

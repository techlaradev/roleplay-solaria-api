import factory from '@adonisjs/lucid/factories'
import LinkToken from '#models/link_token'
import { randomBytes } from 'crypto'

export const TokenFactory = factory
  .define(LinkToken, async ({ faker }) => {
    return {
      token:randomBytes(15).toString('hex')

    }
  })
  .build()
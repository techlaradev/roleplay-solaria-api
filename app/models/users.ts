import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import { DateTime } from 'luxon'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash' // já veio instalada no adonis só bastou fazer o import mesmo
import type { HasMany } from '@adonisjs/lucid/types/relations'
import LinkToken from './link_token.js'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'



const AuthFinder = withAuthFinder(() => hash.use('scrypt'),{

  uids:['email'],
  passwordColumnName: 'password',
})

export default class User extends compose (BaseModel,AuthFinder) {

  // @beforeCreate()
  
  //   static assignUuid(user:User){
  //     if (!user.id){
  //       user.id = crypto.randomUUID()
  //     }
  //   }


  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column({serializeAs : null})
  declare password: string

  @column() 
  declare avatar: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // @beforeSave()
  // static async hashPassword(user : User) {
  //   if (user.$dirty.password)
  //     user.password = await Hash.make(user.password)
  // }

  @hasMany(() => LinkToken)
  declare token: HasMany<typeof LinkToken>


  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

}
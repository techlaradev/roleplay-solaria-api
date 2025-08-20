import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'
import Hash from '@adonisjs/core/services/hash' // já veio instalada no adonis só bastou fazer o import mesmo


export default class User extends BaseModel {
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

  @beforeSave()
  static async hashPassword(user : User) {
    if (user.$dirty.password)
      user.password = await Hash.make(user.password)
  }

}
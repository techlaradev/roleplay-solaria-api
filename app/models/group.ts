import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './users.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare schedule: string

  @column()
  declare location: string

  @column()
  declare chronic: string

  @column()
  declare master: number

  @belongsTo(() => User, {
    foreignKey: 'master'
  })
  declare masterUser:BelongsTo<typeof User>



  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import User from './users.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'


export default class LinkToken extends BaseModel {

  // @beforeCreate()
  // static assignUuid(token:LinkToken) {
  //   if (!token.id){
  //     token.id = crypto.randomUUID()
  //   }
  // }

  @column({ isPrimary: true })
  declare id: string

  @column({})
  declare token : string

  @column({columnName: 'user_id'})
  declare userId : string

  @belongsTo(() => User, {
    foreignKey : 'user_id'
  })
  declare user:BelongsTo <typeof User>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime


  @hasOne(() => User)
  declare User: HasOne<typeof User>
}
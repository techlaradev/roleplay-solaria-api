import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Group  from '#models/group';

import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import  User  from '#models/users';
import { DateTime } from 'luxon'



export default class GroupsRequests extends BaseModel {

  public static table = 'groups_requests'

  @column({ isPrimary: true })
  declare id: number


  @column({columnName:'user_id', serializeAs:'userId'})
  declare userId: number


  @column({columnName:'group_id', serializeAs:'groupId'})
  declare groupId: number

  @belongsTo(() => User,{
    foreignKey: 'user_id'
  })
  declare user: BelongsTo<typeof User>

@belongsTo(() => Group,{
    foreignKey: 'group_id'
  })
  declare Group: BelongsTo<typeof Group>

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

 import Group from '#models/group'
import { createGroupValidator } from '#validators/create_group'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class GroupsController {

  @inject()
   async store ({response, request}: HttpContext){

  const groupPayload = await request.validateUsing(createGroupValidator)
  const group = await Group.create(groupPayload)

  await group.related('players').attach([groupPayload.master])
  await group.load('players')

  return response.created({ group })
}
}

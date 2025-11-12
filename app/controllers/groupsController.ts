 import Group from '#models/group'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class GroupsController {

  @inject()
   async store ({response, request}: HttpContext){

  const groupPayload = request.body()
  const group = await Group.create(groupPayload)

  return response.created({group})
}
}

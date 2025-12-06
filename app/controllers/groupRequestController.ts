import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";
import GroupsRequests from "#models/group_request";

export default class GroupRequestsController {

@inject()
async store({response, request,auth}: HttpContext) {

  const groupId = request.param('groupId') as number
  const userId = auth.user!.id

  const groupRequest = await GroupsRequests.create({groupId, userId})

  await groupRequest.refresh()
  
return response.created({groupRequest})
}


}

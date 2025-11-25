// import type { inject } from '@adonisjs/core/http'

import { inject } from "@adonisjs/core";
import { HttpContext } from "@adonisjs/core/http";

export default class GroupRequestsController {

@inject()
async store({response}: HttpContext) {
return response.created({})
}


}

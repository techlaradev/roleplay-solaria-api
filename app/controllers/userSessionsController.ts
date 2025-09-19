import User from '#models/users'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserSessionsController {
    
  @inject()
  async store({ request, response }: HttpContext) {
    const {email, password} = request.only(['email', 'password'])
   
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)



    return response.created({ user, token })
}
}

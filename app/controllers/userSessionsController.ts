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

@inject()
async destroy({ auth, response }: HttpContext) {
  const user = auth.user
  if (!user) {
    return response.unauthorized({ message: 'Not authenticated' })
  }

  const current = user.currentAccessToken
  if (!current) {
    return response.badRequest({ message: 'No token found in request' })
  }

  // Agora sim: passa user + identifier
  await User.accessTokens.delete(user, current.identifier)

  return response.ok({ message: 'Logout realizado com sucesso' })
}

}

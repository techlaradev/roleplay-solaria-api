import mail from '@adonisjs/mail/services/main'
import { HttpContext } from '@adonisjs/core/http'
import ForgotPasswordMailer from '#mails/forgot_password_notification'
import User from '#models/users'
import { resetPasswordValidator } from '#validators/reset_password'
import BadRequestException from '#exceptions/bad_request_exception'
import LinkToken from '#models/link_token'

export default class PasswordsController {
  async forgetPassword({ request, response }: HttpContext) {
    const { email, resetPasswordURL } = request.only(['email','resetPasswordURL'])
    const user = await User.findByOrFail('email', email)

    await mail.send(new ForgotPasswordMailer(user, resetPasswordURL))

    return response.noContent()
  }

  async resetPassword({ request, response }: HttpContext) {
  const { token, password } = await request.validateUsing(resetPasswordValidator)

  try {
    
    const tokenRecord = await LinkToken.findByOrFail('token', token)
    console.log('log 1',tokenRecord.userId)
    const user = await User.findByOrFail('id',tokenRecord.userId)
    
    user.password = password
    await user.save()

    // Deleta o token após o uso
    await tokenRecord.delete()

    return response.noContent()
  } catch (error) {
    if (error.code === 'E_ROW_NOT_FOUND') {
      throw new BadRequestException('Token não encontrado', 404)
    }
    throw error
  }
  }
}
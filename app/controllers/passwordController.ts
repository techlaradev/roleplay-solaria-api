import mail from '@adonisjs/mail/services/main'
import { HttpContext } from '@adonisjs/core/http'
import ForgotPasswordMailer from '#mails/forgot_password_notification'
import User from '#models/users'

export default class PasswordsController {
  async forgetPassword({ request, response }: HttpContext) {
    const { email, resetPasswordURL } = request.only(['email','resetPasswordURL'])
    const user = await User.findByOrFail('email', email)

    await mail.send(new ForgotPasswordMailer(user, resetPasswordURL))

    return response.noContent()
  }
}

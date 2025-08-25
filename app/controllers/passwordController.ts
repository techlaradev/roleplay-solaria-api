import mail from '@adonisjs/mail/services/main'
import { HttpContext } from '@adonisjs/core/http'
import ForgotPasswordMailer from '#mails/forgot_password_notification'
export default class PasswordsController {
  async forgetPassword({ request, response }: HttpContext) {
    const { email, resetPasswordURL } = request.only(['email', 'resetPasswordURL'])

    await mail.send(new ForgotPasswordMailer(email, resetPasswordURL))

    return response.status(204)
  }
}

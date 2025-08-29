import mail from '@adonisjs/mail/services/main'
import { HttpContext } from '@adonisjs/core/http'
import ForgotPasswordMailer from '#mails/forgot_password_notification'
import User from '#models/users'
import { resetPasswordValidator } from '#validators/reset_password'
import LinkToken from '#models/link_token'

export default class PasswordsController {

  async forgetPassword({ request, response }: HttpContext) {
    const { email, resetPasswordURL } = request.only(['email','resetPasswordURL'])
    const user = await User.findByOrFail('email', email)

    await mail.send(new ForgotPasswordMailer(user, resetPasswordURL))

    return response.noContent()
  }

  async resetPassword({request, response}:HttpContext){
    const {token, password} = await request.validateUsing(resetPasswordValidator);

    //inserção SQL - essa função vai buscar o usuário por token, se não achar deve falhar
    const userByToken = await User.query()
    .whereHas('token', (query) =>{
      query.where('token', token)
    }).firstOrFail()

    userByToken.password = password
    await userByToken.save()


   await LinkToken.query()
   .where('token',token)
   .delete()

    return response.noContent()
  }
}

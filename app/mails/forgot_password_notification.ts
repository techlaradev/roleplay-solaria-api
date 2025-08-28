
import { BaseMail } from '@adonisjs/mail'
import User from '#models/users'

export default class ForgotPasswordMailer extends BaseMail {
  constructor( public user: User, public resetPasswordURL: string) {
    super()
  }

  public prepare() {
    this.message
      .to(this.user.email)
      .from('no-reply@solariaplays.com')
      .subject('Roleplay: Recuperação de Senha')
      .htmlView('forgottenpasswordnotify', { 
        productName: 'Solaria Roleplay',
        name:this.user.name,
        resetPasswordURL: this.resetPasswordURL,
      })
  }
}

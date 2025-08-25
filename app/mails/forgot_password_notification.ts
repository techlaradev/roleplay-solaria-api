// app/Mailers/ForgotPasswordMailer.ts
import { BaseMail } from '@adonisjs/mail'

export default class ForgotPasswordMailer extends BaseMail {
  constructor(public email: string, public resetUrl: string) {
    super()
  }

  public prepare() {
    this.message
      .to(this.email)
      .from('no-reply@solariaplays.com')
      .subject('Roleplay: Recuperação de Senha')
      //.htmlView('emails/forgot_password', { resetUrl: this.resetUrl })
  }
}

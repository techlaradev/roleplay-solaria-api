import type { HttpContext } from '@adonisjs/core/http'
import { inject } from "@adonisjs/core";
import mail from '@adonisjs/mail/services/main';

export default class PasswordsController {

    @inject()
    async forgetPassword({response, request} : HttpContext){
        const {email} = request.only(['email'])

        await mail.send((message) => {
            message
                .from('noreplay@solariaplays.com')
                .to(email)
                .subject('Roleplay Solaria: Recuperação de senha')
                .text('A mesa de RPG te espera! entre no link para redefinir sua senha e iniciar uma nova aventura!')
        })

        return response.status(204)
    }

}

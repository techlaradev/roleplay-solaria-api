import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'

export default class ExpiredTokenException extends Exception {
  static code = 'TOKEN_EXPIRED'
  static status = 410

    constructor() {
      super('token was expired')
    }
  
    async handle(error: this, ctx: HttpContext) {
      ctx.response
      .status(error.status!)
      .send({
        code: ExpiredTokenException.code,
        message: error.message,
        status: error.status,
      })
}
}

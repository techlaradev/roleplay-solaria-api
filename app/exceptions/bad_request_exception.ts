// exceptions/bad_request_exception.ts
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class BadRequestException extends Exception {
  static code = 'BAD_REQUEST'

  constructor(message: string, status: number = 400) {
    super(message, { status })
  }

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status!).send({
      code: BadRequestException.code,
      message: error.message,
      status: error.status,
    })
  }
}

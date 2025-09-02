// exceptions/bad_request_exception.ts
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class BadRequestException extends Exception {
  static code = 'BAD_REQUEST'

  constructor(message: string, status: number = 400) {
    super(message, { status })
  }

  async handle(error: this, ctx: HttpContext) {
    // Se for um erro de "row not found", retorna 404
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(404).send({
        code: BadRequestException.code,
        message: error.message,
        status: 404,
        error: '404'
      })
    }

    // Para outros erros, usa o status original
    ctx.response.status(error.status || 400).send({
      code: BadRequestException.code,
      message: error.message,
      status: error.status || 400
    })
  }
}
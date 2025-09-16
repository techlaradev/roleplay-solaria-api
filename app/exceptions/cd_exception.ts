import { Exception } from '@adonisjs/core/exceptions'

export default class CdException extends Exception {
  static status = 500
}
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'link_tokens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('token', 225).unique().notNullable()
      table.string('user_id')
      .unsigned() // sabendo que esta coluna só aceita números inteiros, o unsigned não permite que esses números não venham negativos
      .unique()
      .notNullable()
      .references('uuid')
      .inTable('users')
      .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
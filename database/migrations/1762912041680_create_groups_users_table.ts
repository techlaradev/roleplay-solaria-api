import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'groups_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(['user_id','group_id'])
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('group_id').unsigned().references('id').inTable('groups').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

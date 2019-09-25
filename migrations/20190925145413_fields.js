exports.up = function (knex) {
  return knex.schema.createTable('fields', t => {
    t.increments('id')
      .unsigned()
      .primary()
    t.dateTime('createdAt').notNull().defaultTo(knex.fn.now())
    t.dateTime('updatedAt').nullable()
    t.dateTime('deletedAt').nullable()

    t.string('name').nullable()
    t.string('value').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('fields')
}

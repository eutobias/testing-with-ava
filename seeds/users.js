exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      // return knex('users').insert([
      //   { name: 'User 1', email: 'user1@company.com' },
      //   { name: 'User 2', email: 'user2@company.com' },
      //   { name: 'User 3', email: 'user3@company.com' }
      // ])
    })
}

'use strict'

const bcrypt = require('bcryptjs')
const SEED_ADMIN = {
  name: 'root',
  email: 'root@root.com',
  password: '123'
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: SEED_ADMIN.name,
      email: SEED_ADMIN.email,
      password: bcrypt.hashSync(SEED_ADMIN.password, bcrypt.genSaltSync(10), null),
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}

'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync();
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        role: 'admin',
        email: 'admin@xyz.com',
        password: bcrypt.hashSync('#Admin123', salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

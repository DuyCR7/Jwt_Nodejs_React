'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('User', {
      fields: ['groupId'],
      type: 'foreign key',
      name: 'fk_user_group',
      references: {
        table: 'Group',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('User', {
      fields: ['groupId'],
      type: 'foreign key',
      name: 'fk_user_group',
      references: {
        table: 'Group',
        field: 'id'
      }
    });
  }
};

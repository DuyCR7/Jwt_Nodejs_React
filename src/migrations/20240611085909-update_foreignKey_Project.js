'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Project', {
      fields: ['customerId'],
      type: 'foreign key',
      name: 'fk_project_user',
      references: {
        table: 'User',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Project', {
      fields: ['customerId'],
      type: 'foreign key',
      name: 'fk_project_user',
      references: {
        table: 'User',
        field: 'id'
      }
    });
  }
};

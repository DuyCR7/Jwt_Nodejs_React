'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Project_User', {
      fields: ['projectId'],
      type: 'foreign key',
      name: 'fk_projectUser_project',
      references: {
        table: 'Project',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('Project_User', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_projectUser_user',
      references: {
        table: 'User',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Project_User', {
      fields: ['projectId'],
      type: 'foreign key',
      name: 'fk_projectUser_project',
      references: {
        table: 'Project',
        field: 'id'
      }
    });
    await queryInterface.removeConstraint('Project_User', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_projectUser_user',
      references: {
        table: 'User',
        field: 'id'
      }
    });
  }
};

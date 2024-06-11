'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Group_Role', {
      fields: ['groupId'],
      type: 'foreign key',
      name: 'fk_groupRole_group',
      references: {
        table: 'Group',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('Group_Role', {
      fields: ['roleId'],
      type: 'foreign key',
      name: 'fk_groupRole_role',
      references: {
        table: 'Role',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Group_Role', {
      fields: ['groupId'],
      type: 'foreign key',
      name: 'fk_groupRole_group',
      references: {
        table: 'Group',
        field: 'id'
      }
    });
    await queryInterface.removeConstraint('Group_Role', {
      fields: ['roleId'],
      type: 'foreign key',
      name: 'fk_groupRole_role',
      references: {
        table: 'Role',
        field: 'id'
      }
    });
  }
};

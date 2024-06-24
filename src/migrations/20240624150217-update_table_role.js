'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Role',
      'deleted',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      }
    ),
    await queryInterface.addColumn(
      'Role',
      'deletedAt',
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
    );


    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Role', 'deletedAt');
    await queryInterface.removeColumn('Role', 'deleted');
  }
};

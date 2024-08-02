'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Group_Role', 
      [
        {
          groupId: 1,
          roleId: 1,
        },
        {
          groupId: 1,
          roleId: 5,
        },
        {
          groupId: 1,
          roleId: 10,
        },
        {
          groupId: 1,
          roleId: 13,
        },
        {
          groupId: 1,
          roleId: 14,
        },
        {
          groupId: 2,
          roleId: 1,
        },
        {
          groupId: 2,
          roleId: 2,
        },
        {
          groupId: 2,
          roleId: 3,
        },
        {
          groupId: 2,
          roleId: 4,
        },
        {
          groupId: 2,
          roleId: 5,
        },
        {
          groupId: 2,
          roleId: 6,
        },
        {
          groupId: 2,
          roleId: 7,
        },
        {
          groupId: 2,
          roleId: 8,
        },
        {
          groupId: 2,
          roleId: 9,
        },
        {
          groupId: 2,
          roleId: 10,
        },
        {
          groupId: 2,
          roleId: 11,
        },
        {
          groupId: 2,
          roleId: 12,
        },
        {
          groupId: 2,
          roleId: 13,
        },
        {
          groupId: 2,
          roleId: 14,
        },
        {
          groupId: 2,
          roleId: 15,
        },
        {
          groupId: 2,
          roleId: 16,
        },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

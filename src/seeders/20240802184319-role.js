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
    await queryInterface.bulkInsert('Role', 
      [
        {
          url: '/user/read',
          description: 'Xem danh sách user',
        },
        {
          url: '/user/create',
          description: 'Tạo mới user',
        },
        {
          url: '/user/update',
          description: 'Cập nhật user',
        },
        {
          url: '/user/delete',
          description: 'Xóa user',
        },
        {
          url: '/user/get-by-id',
          description: 'Xem thông tin user',
        },
        {
          url: '/role/read',
          description: 'Xem danh sách quyền',
        },
        {
          url: '/role/create',
          description: 'Tạo mới quyền',
        },
        {
          url: '/role/update',
          description: 'Cập nhật quyền',
        },
        {
          url: '/role/delete',
          description: 'Xóa quyền',
        },
        {
          url: '/role/by-group',
          description: 'Xem quyền của nhóm',
        },
        {
          url: '/role/assign-to-group',
          description: 'Gán các quyền cho nhóm',
        },
        {
          url: '/role/delete-many',
          description: 'Xóa nhiều quyền',
        },
        {
          url: '/role/read-trash',
          description: 'Xem quyền trong thùng rác',
        },
        {
          url: '/role/restore',
          description: 'Khôi phục quyền',
        },
        {
          url: '/role/restore-many',
          description: 'Khôi phục nhiều quyền',
        },
        {
          url: '/group/read',
          description: 'Xem thông tin nhóm',
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

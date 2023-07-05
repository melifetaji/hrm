'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leaves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lid: {
        type: Sequelize.INTEGER
      },
      eid: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      reason: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      days: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('leaves');
  }
};
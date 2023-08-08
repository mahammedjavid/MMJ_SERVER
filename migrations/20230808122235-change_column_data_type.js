'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('customer_details', 'mobile_number', {
      type: Sequelize.BIGINT, // Change to the desired data type
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('customer_details', 'mobile_number', {
      type: Sequelize.INTEGER, // Revert back to the original data type
    });
  }
};

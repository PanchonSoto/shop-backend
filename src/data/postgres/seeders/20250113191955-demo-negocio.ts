'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // @ts-ignore
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

    const users = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Users" WHERE role = 'NEGOCIO';`
    );

    const negocioUsers = users[0];

    // @ts-ignore
    const negocios = negocioUsers.map(user => ({
      name: `${user.name} S.A.`,
      user_id: user.id
    }));

    if (negocios.length > 0) {
      await queryInterface.bulkInsert('negocios', negocios, {});
    }

  },

  // @ts-ignore
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('negocios', null, {});
  }
};

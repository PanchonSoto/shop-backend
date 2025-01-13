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

    const negocios = await queryInterface.sequelize.query(
      `SELECT id, name FROM "negocios";`
    );

    const negocioData = negocios[0];

    // @ts-ignore
    const products = negocioData.flatMap(negocio => [
      {
        name: `Product A - ${negocio.name}`,
        negocio_id: negocio.id,
        stock: 50,
        price: 100.00,
        available: true,
      },
      {
        name: `Product B - ${negocio.name}`,
        negocio_id: negocio.id,
        stock: 30,
        price: 150.50,
        available: true,
      },
      {
        name: `Product C - ${negocio.name}`,
        negocio_id: negocio.id,
        stock: 40,
        price: 250.75,
        available: false,
      },
      {
        name: `Product D - ${negocio.name}`,
        negocio_id: negocio.id,
        stock: 5,
        price: 275.50,
        available: false,
      },
      {
        name: `Product E - ${negocio.name}`,
        negocio_id: negocio.id,
        stock: 1,
        price: 675.75,
        available: false,
      }
    ]);


    if (products.length > 0) {
      await queryInterface.bulkInsert('products', products, {});
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
    await queryInterface.bulkDelete('products', null, {});
  }
};

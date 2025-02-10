"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // @ts-ignore
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const stores = await queryInterface.sequelize.query(
      `SELECT id, name FROM "stores";`
    );

    const storeData = stores[0];

    // @ts-ignore
    const products = storeData.flatMap((store) => [
      {
        name: `Product A - ${store.name}`,
        store_id: store.id,
        stock: 50,
        price: 100.0,
        available: true,
      },
      {
        name: `Product B - ${store.name}`,
        store_id: store.id,
        stock: 30,
        price: 150.5,
        available: true,
      },
      {
        name: `Product C - ${store.name}`,
        store_id: store.id,
        stock: 40,
        price: 250.75,
        available: false,
      },
      {
        name: `Product D - ${store.name}`,
        store_id: store.id,
        stock: 5,
        price: 275.5,
        available: false,
      },
      {
        name: `Product E - ${store.name}`,
        store_id: store.id,
        stock: 1,
        price: 675.75,
        available: false,
      },
    ]);

    if (products.length > 0) {
      await queryInterface.bulkInsert("products", products, {});
    }
  },
  // @ts-ignore
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("products", null, {});
  },
};

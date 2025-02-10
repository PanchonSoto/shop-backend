"use strict";
const bcrypt = require("bcrypt");

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

    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("securepass456", 10);
    const hashedPassword3 = await bcrypt.hash("mypassword789", 10);
    const hashedPassword4 = await bcrypt.hash("admin777", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Juan Pérez",
          email: "juan.perez@example.com",
          password: hashedPassword1,
          role: "STORE",
          is_verified: true,
        },
        {
          name: "Ana López",
          email: "ana.lopez@example.com",
          password: hashedPassword2,
          role: "STORE",
          is_verified: false,
        },
        {
          name: "Mark Zucaritas",
          email: "rikisimo.mark@example.com",
          password: hashedPassword3,
          role: "STORE",
          is_verified: true,
        },
        {
          name: "H. De Leon",
          email: "cabezon@example.com",
          password: hashedPassword3,
          role: "STORE",
          is_verified: true,
        },
        {
          name: "Administrador",
          email: "admin@gmail.com",
          password: hashedPassword4,
          role: "ADMIN",
          is_verified: true,
        },
      ],
      {}
    );
  },
  // @ts-ignore
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(
      "Users",
      {
        email: [
          "juan.perez@example.com",
          "ana.lopez@example.com",
          "rikisimo.mark@example.com",
          "cabezon@example.com",
        ],
      },
      {}
    );
  },
};

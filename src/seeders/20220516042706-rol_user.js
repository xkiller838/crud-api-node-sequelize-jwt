'use strict';
/* module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Roles', [{
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {returning: true}).then(function(Roles){
      return queryInterface.bulkInsert('Roles', [{
          name: 'Users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]);
      
    });
}
};
 */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [{
      name: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'User',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', null, {});
  }
};

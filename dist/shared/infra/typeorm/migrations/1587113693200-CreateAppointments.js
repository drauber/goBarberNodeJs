"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateAppointments1587113693200 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'appointments',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid'
      }, {
        name: 'provider',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'date',
        type: 'timestamp with time zone',
        isNullable: false
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('appointments');
  }

}

exports.default = CreateAppointments1587113693200;
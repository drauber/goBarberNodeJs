"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AlterProviderFiledToProviderId1587201702080 {
  async up(queryRunner) {
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('appointments', new _typeorm.TableForeignKey({
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      name: 'fk_appointment_provider_user'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('appointments', 'fk_appointment_provider_user');
    await queryRunner.dropColumn('appointments', 'provider_id');
    await queryRunner.addColumn('appointments', new _typeorm.TableColumn({
      name: 'provider',
      type: 'varchar',
      isNullable: false
    }));
  }

}

exports.default = AlterProviderFiledToProviderId1587201702080;
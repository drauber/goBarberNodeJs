"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CreateColumnsOnAppointments1587120882451 {
  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE public.appointments
      ADD COLUMN created_at timestamp without time zone default now();
      ALTER TABLE public.appointments
      ADD COLUMN updated_at timestamp without time zone default now();`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE public.appointments
      DROP COLUMN created_at;
      ALTER TABLE public.appointments
      DROP COLUMN updated_at;`);
  }

}

exports.default = CreateColumnsOnAppointments1587120882451;
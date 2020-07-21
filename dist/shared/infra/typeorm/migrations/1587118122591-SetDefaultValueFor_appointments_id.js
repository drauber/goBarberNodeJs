"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SetDefaultValueForAppointmentsId1587118122591 {
  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE public.appointments ALTER COLUMN id SET DEFAULT uuid_generate_v4();`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE public.appointments ALTER COLUMN id SET DEFAULT null;`);
  }

}

exports.default = SetDefaultValueForAppointmentsId1587118122591;
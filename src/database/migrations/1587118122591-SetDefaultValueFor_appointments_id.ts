import { MigrationInterface, QueryRunner } from 'typeorm';

export default class SetDefaultValueForAppointmentsId1587118122591
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.appointments ALTER COLUMN id SET DEFAULT uuid_generate_v4();`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.appointments ALTER COLUMN id SET DEFAULT null;`
    );
  }
}

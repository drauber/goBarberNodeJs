import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateColumnsOnAppointments1587120882451
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.appointments
      ADD COLUMN created_at timestamp without time zone default now();
      ALTER TABLE public.appointments
      ADD COLUMN updated_at timestamp without time zone default now();`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE public.appointments
      DROP COLUMN created_at;
      ALTER TABLE public.appointments
      DROP COLUMN updated_at;`
    );
  }
}

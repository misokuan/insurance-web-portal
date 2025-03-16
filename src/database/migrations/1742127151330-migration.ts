import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742127151330 implements MigrationInterface {
    name = 'Migration1742127151330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "BILLING_RECORDS" ("id" SERIAL NOT NULL, "productCode" integer NOT NULL, "location" character varying NOT NULL, "premiumPaid" real NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_58bbd26cba4f525e5b0cfa068c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "USERS" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_b16c39a00c89083529c6166fa5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "BILLING_RECORDS" ADD CONSTRAINT "FK_f6d96b36308d519815fc6dbd433" FOREIGN KEY ("userId") REFERENCES "USERS"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "BILLING_RECORDS" DROP CONSTRAINT "FK_f6d96b36308d519815fc6dbd433"`);
        await queryRunner.query(`DROP TABLE "USERS"`);
        await queryRunner.query(`DROP TABLE "BILLING_RECORDS"`);
    }

}

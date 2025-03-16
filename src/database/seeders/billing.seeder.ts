import { Seeder } from "@jorgebodega/typeorm-seeding";
import { Billing } from "src/billing/billing.entity";
import { DataSource } from "typeorm";
import { BillingSeed } from "./billing.seed";

export default class BillingSeeder extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const billings: Billing[] = BillingSeed.map(data => {
      const billing = new Billing();
      Object.assign(billing, data);
      return billing;
    });
    await dataSource.createEntityManager().save<Billing>(billings)
  }
}
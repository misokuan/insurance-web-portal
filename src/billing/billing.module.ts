import { Module } from "@nestjs/common";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Billing } from "./billing.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Billing])],
  controllers: [BillingController],
  providers: [BillingService]
})
export class BillingModule {}
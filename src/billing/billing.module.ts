import { Module } from "@nestjs/common";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Billing } from "./billing.entity";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "src/role/role.guard";

@Module({
  imports: [TypeOrmModule.forFeature([Billing])],
  controllers: [BillingController],
  providers: [BillingService, {
    provide: APP_GUARD,
    useClass: RolesGuard
  }]
})
export class BillingModule {}
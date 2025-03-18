import { Module } from "@nestjs/common";
import { BillingController } from "./billing.controller";
import { BillingService } from "./billing.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Billing } from "./billing.entity";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "src/role/role.guard";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Billing]), TypeOrmModule.forFeature([User])],
  controllers: [BillingController],
  providers: [
    BillingService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class BillingModule { }
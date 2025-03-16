import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BillingService } from "./billing.service";
import { Billing } from "./billing.entity";
import { BillingDto, OptionalBillingQueryDto, SingleBillingQueryDto } from "./dto";
import { Roles } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // [GET] /billing?productCode=&location=
  @Get()
  @Roles(Role.Admin, Role.User)
  async getBillings(
    @Query() queryDto: OptionalBillingQueryDto
  ): Promise<number> {
    return this.billingService.findAll(queryDto);
  }

  // [POST] /billing
  @Post()
  @Roles(Role.Admin)
  async createBilling(
    @Body() bodyDto: BillingDto
  ): Promise<Billing> {
    return this.billingService.create(bodyDto);
  }

  // [PUT] /billing?userId=&productCode=
  @Put()
  @Roles(Role.Admin)
  async updateBilling(
    @Query() queryDto: SingleBillingQueryDto,
    @Body() bodyDto: BillingDto
  ): Promise<Billing> {
    return this.billingService.update(queryDto, bodyDto);
  }

  // [DELETE] /billing?userId=&productCode=
  @Delete()
  @Roles(Role.Admin)
  async deleteBilling(
    @Query() queryDto: SingleBillingQueryDto
  ) {
    const billingRecord = await this.billingService.findOne(queryDto);
    return this.billingService.delete(billingRecord.id);
  }
}
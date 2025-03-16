import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BillingService } from "./billing.service";
import { Billing } from "./billing.entity";
import { BillingDto, OptionalBillingQueryDto, SingleBillingQueryDto } from "./dto";

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // [GET] /billing?productCode=&location=
  @Get()
  async getBillings(
    @Query() queryDto: OptionalBillingQueryDto
  ): Promise<Billing[]> {
    return this.billingService.findAll(queryDto);
  }

  // [POST] /billing
  @Post()
  async createBilling(
    @Body() bodyDto: BillingDto
  ): Promise<Billing> {
    return this.billingService.create(bodyDto);
  }

  // [PUT] /billing?userId=&productCode=
  @Put()
  async updateBilling(
    @Query() queryDto: SingleBillingQueryDto,
    @Body() bodyDto: BillingDto
  ): Promise<Billing> {
    return this.billingService.update(queryDto, bodyDto);
  }

  // [DELETE] /billing?userId=&productCode=
  @Delete()
  async deleteBilling(
    @Query() queryDto: SingleBillingQueryDto
  ) {
    const billingRecord = await this.billingService.findOne(queryDto);
    return this.billingService.delete(billingRecord.id);
  }
}
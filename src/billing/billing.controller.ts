import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { BillingService } from "./billing.service";
import { Billing } from "./billing.entity";

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // [GET] /billing?productCode=&location=
  @Get()
  async getBillings(
    @Query('productCode') productCode?: number,
    @Query('location') location?: string
  ): Promise<Billing[]> {
    return this.billingService.findAll(productCode, location);
  }

  // [POST] /billing
  @Post()
  async createBilling(
    @Body() billing: Billing
  ): Promise<Billing> {
    return this.billingService.create(billing);
  }

  // [PUT] /billing?userId=&productCode=
  @Put()
  async updateBilling(
    @Query('userId') userId: number,
    @Query('productCode') productCode: number,
    @Body() billing: Billing
  ): Promise<Billing> {
    return this.billingService.update(userId, productCode, billing);
  }

  // [DELETE] /billing?userId=&productCode=
  @Delete()
  async deleteBilling(
    @Query('userId') userId: number,
    @Query('productCode') productCode: number
  ) {
    const billingRecord = await this.billingService.findOne(userId, productCode);
    return this.billingService.delete(billingRecord.id);
  }
}
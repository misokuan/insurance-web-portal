import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BillingService } from "./billing.service";
import { Billing } from "./billing.entity";

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // [GET] /billing
  @Get()
  async getBillings(): Promise<Billing[]> {
    return this.billingService.findAll();
  }

  // [POST] /billing
  @Post()
  async createBilling(
    @Body() billing: Billing
  ): Promise<Billing> {
    return this.billingService.create(billing);
  }

  // [PUT] /billing/:userId/:productCode
  @Put(':userId/:productCode')
  async updateBilling(
    @Param('userId') userId: number,
    @Param('productCode') productCode: number,
    @Body() billing: Billing
  ): Promise<Billing> {
    return this.billingService.update(userId, productCode, billing);
  }

  // [DELETE] /billing/:userId/:productCode
  @Delete(':userId/:productCode')
  async deleteBilling(
    @Param('userId') userId: number,
    @Param('productCode') productCode: number
  ) {
    const billingRecord = await this.billingService.findOne(userId, productCode);
    return this.billingService.delete(billingRecord.id);
  }
}
import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { BillingService } from "./billing.service";

@Controller()
export class BillingController {
  constructor(private billingService: BillingService) {}

  // GET /billing
  @Get('billing')
  getBilling() {
    return this.billingService.getBilling();
  }

  // POST /billing
  @Post('billing')
  addBilling() {
    return this.billingService.addBilling();
  }

  // PUT /billing
  @Put('billing')
  updateBilling() {
    return this.billingService.updateBilling();
  }

  // DELETE /billing
  @Delete('billing')
  deleteBilling() {
    return this.billingService.deleteBilling();
  }
}
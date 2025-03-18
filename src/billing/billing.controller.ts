import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { BillingService } from "./billing.service";
import { Billing } from "./billing.entity";
import { BillingDto, OptionalBillingQueryDto, SingleBillingQueryDto, TotalPremiumPaidDto } from "./dto";
import { Roles } from "src/role/role.decorator";
import { Role } from "src/role/role.enum";
import { ApiSecurity } from "@nestjs/swagger";

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // [GET] /billing?productCode=&location=
  @Get()
  @ApiSecurity('Role')
  @Roles(Role.Admin, Role.User)
  async getBillings(
    @Query() queryDto: OptionalBillingQueryDto
  ): Promise<TotalPremiumPaidDto> {
    return this.billingService.findAll(queryDto);
  }

  // [POST] /billing
  @Post()
  @ApiSecurity('Role')
  @Roles(Role.Admin)
  async createBilling(
    @Body() bodyDto: BillingDto
  ): Promise<Billing> {
    return await this.billingService.create(bodyDto).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  // [PUT] /billing?userId=&productCode=
  @Put()
  @ApiSecurity('Role')
  @Roles(Role.Admin)
  async updateBilling(
    @Query() queryDto: SingleBillingQueryDto,
    @Body() bodyDto: BillingDto
  ): Promise<Billing> {
    return await this.billingService.update(queryDto, bodyDto).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
  }

  // [DELETE] /billing?userId=&productCode=
  @Delete()
  @ApiSecurity('Role')
  @Roles(Role.Admin)
  async deleteBilling(
    @Query() queryDto: SingleBillingQueryDto
  ) {
    const billingRecord = await this.billingService.findOne(queryDto).catch(err => {
      throw new HttpException({
        message: err.message
      }, HttpStatus.BAD_REQUEST)
    });
    return this.billingService.delete(billingRecord.id);
  }
}
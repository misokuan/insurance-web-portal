import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Billing } from "./billing.entity";
import { BillingDto, OptionalBillingQueryDto, SingleBillingQueryDto } from "./dto";

@Injectable({})
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
  ) { }

  // retrieve all billing details
  async findAll(queryDto: OptionalBillingQueryDto): Promise<string> {
    let optionalSearch = Object.assign({},
      queryDto.productCode && { productCode: queryDto.productCode },
      queryDto.location && { location: queryDto.location }
    );
    const results = await this.billingRepository.find({
      where: optionalSearch,
      select: {
        premiumPaid: true,
      }
    });

    let sumOfPremiumPaid = 0;

    results.forEach((result) => {
      sumOfPremiumPaid += parseFloat(result.premiumPaid);
    })

    return `MYR ${sumOfPremiumPaid}`;
  }

  // retrieve specific billing detail
  async findOne(queryDto: SingleBillingQueryDto): Promise<Billing> {
    return await this.billingRepository.findOneByOrFail(queryDto);
  }

  // create new billing detail entry
  async create(bodyDto: BillingDto): Promise<Billing> {
    const newBilling = this.billingRepository.create(bodyDto);
    const newBillingId = (await this.billingRepository.insert(newBilling)).generatedMaps[0].id;
    return await this.billingRepository.findOneByOrFail({ id: newBillingId });
  }

  // update specific billing detail
  async update(queryDto: SingleBillingQueryDto, bodyDto: BillingDto): Promise<Billing> {
    await this.billingRepository.update(queryDto, bodyDto);
    return await this.billingRepository.findOneByOrFail(bodyDto);
  }

  // DELETE specific billing detail
  async delete(id: number): Promise<void> {
    await this.billingRepository.delete(id);
  }
}
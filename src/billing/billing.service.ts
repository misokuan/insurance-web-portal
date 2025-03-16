import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Billing } from "./billing.entity";

@Injectable({})
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
  ) { }

  // retrieve all billing details
  async findAll(productCode?: number, location?: string): Promise<Billing[]> {
    let optionalSearch = Object.assign({},
      productCode && { productCode },
      location && { location }
    );
    return await this.billingRepository.findBy(optionalSearch);
  }

  // retrieve specific billing detail
  async findOne(userId: number, productCode: number): Promise<Billing> {
    return await this.billingRepository.findOneByOrFail({ userId, productCode });
  }

  // create new billing detail entry
  async create(billing: Billing): Promise<Billing> {
    const newBilling = this.billingRepository.create(billing);
    const newBillingId = (await this.billingRepository.insert(newBilling)).generatedMaps[0].id;
    return await this.billingRepository.findOneByOrFail({ id: newBillingId });
  }

  // update specific billing detail
  async update(userId: number, productCode: number, billing: Billing): Promise<Billing> {
    await this.billingRepository.update({ userId, productCode }, billing);
    return await this.billingRepository.findOneByOrFail(billing);
  }

  // DELETE specific billing detail
  async delete(id: number): Promise<void> {
    await this.billingRepository.delete(id);
  }
}
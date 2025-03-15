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
  async findAll(): Promise<Billing[]> {
    return await this.billingRepository.find();
  }

  // retrieve specific billing detail
  async findOne(userId: number, productCode: number): Promise<Billing> {
    return await this.billingRepository.findOneOrFail({ where: { userId, productCode } });
  }

  // create new billing detail entry
  async create(billing: Billing): Promise<Billing> {
    const newBilling = this.billingRepository.create(billing);
    const newBillingId = (await this.billingRepository.insert(newBilling)).generatedMaps[0].id;
    return await this.billingRepository.findOneOrFail({ where: { id: newBillingId } });
  }

  // update specific billing detail
  async update(userId: number, productCode: number, billing: Billing): Promise<Billing> {
    await this.billingRepository.update({ userId, productCode }, billing);
    return this.findOne(userId, productCode);
  }

  // DELETE specific billing detail
  async delete(id: number): Promise<void> {
    await this.billingRepository.delete(id);
  }
}
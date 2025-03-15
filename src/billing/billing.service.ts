import { Injectable } from "@nestjs/common";

@Injectable({})
export class BillingService {

  // GET billing details
  getBilling() {
    return "Get billing details";
  }

  // POST billing details
  addBilling() {
    return "Add billing details";
  }

  // PUT billing details
  updateBilling() {
    return "Update billing details";
  }

  // DELETE billing details
  deleteBilling() {
    return "Delete billing details";
  }

}
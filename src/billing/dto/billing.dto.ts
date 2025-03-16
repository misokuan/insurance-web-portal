import { IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class BillingDto {
  @IsNumber()
  @IsNotEmpty()
  productCode: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsDecimal()
  @IsNotEmpty()
  premiumPaid: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class SingleBillingQueryDto {
  @IsNumber()
  @IsNotEmpty()
  productCode: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class OptionalBillingQueryDto {
  @IsNumber()
  @IsOptional()
  productCode: number;

  @IsString()
  @IsOptional()
  location: string;
}
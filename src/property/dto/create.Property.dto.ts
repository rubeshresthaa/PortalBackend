import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class AddPropertyDto {

  @IsString()
  @IsNotEmpty()

  propertyTitle: string;

  @IsString()
  @IsNotEmpty()
  propertyAddress: string;

  @IsNumber()
  @IsNotEmpty()
  propertyPrice: number;

  @IsString()
  @IsOptional()
  propertyImage?: string;

  @IsString()
  @IsOptional()
  propertyType?: string;

  @IsNumber()
  @IsOptional()
  propertyBeds?: number;

  @IsNumber()
  @IsOptional()
  propertyBaths?: number;
}



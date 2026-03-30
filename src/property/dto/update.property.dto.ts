import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';


export class EditPropertyDto {
  @IsString()
  @IsOptional()
  propertyTitle?: string;

  @IsString()
  @IsOptional()
  propertyAddress?: string;

  @IsNumber()
  @IsOptional()
  propertyPrice?: number;

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
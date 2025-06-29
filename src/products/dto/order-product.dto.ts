import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator"


export class CreateProductDto {
  @IsNumber()
  @Type(() => Number)
  id: number
  @IsNotEmpty({ message: 'El nombre no puede ir vacío.' })
  @IsOptional()
  name?: string;
  @IsNumber()
  @Type(() => Number)
  price: number
  @IsNumber()
  @Type(() => Number)
  quantity: number



}


export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  items: CreateProductDto[]


}






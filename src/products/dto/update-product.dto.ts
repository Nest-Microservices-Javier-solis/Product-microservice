import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";


export class UpdateProductDto {
    @IsNumber()
    @IsPositive()
    id:number
    @IsString()
    @IsOptional()
    name?: string;
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    price?: number


}

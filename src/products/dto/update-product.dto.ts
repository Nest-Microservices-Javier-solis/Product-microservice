import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name?: string;
    @IsNumber()
    @Type(() => Number)
    price?: number


}

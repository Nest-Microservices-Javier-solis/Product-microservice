import { IsNotEmpty, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateProductDto {
    @IsNotEmpty({ message: 'El nombre no puede ir vacío.' })
    name: string;
    @IsNumber()
    @Type(() => Number)
    price: number



}

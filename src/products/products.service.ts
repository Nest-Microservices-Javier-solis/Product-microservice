import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDto } from 'src/dto/pagination.dto';
import { paginationConfig } from 'src/dto/paginationFun';
import { PrismaClientOptions } from 'generated/prisma/runtime/library';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {

    await this.$connect()
    const logger = new Logger('ProductService')
    logger.log('Conectado a base de datos')
  }

  async create(createProductDto: CreateProductDto) {


    return await this.product.create({ data: createProductDto });
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit: take, page } = paginationDto
    const skip = paginationConfig(page!, take!)

    const data = await this.product.findMany({
      take,
      skip
    })
    if (!data.length) throw new NotFoundException('Esta página no existe ')

    const totalProduct = await this.product.count()
    const totalPage = Math.ceil(totalProduct / 5)
    return { data, meta: { totalProduct, page, totalPage } };
  }

  async findOne(id: number) {

    const product = await this.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException({ message: 'Producto no encontrado' })
    }
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id)
    try {
      await this.product.update({ where: { id }, data: updateProductDto })
      return { message: 'Producto Actualizado Correctamente' }


    } catch (error) {
      throw new Error('Error al editar el artículo')
    }

  }

  async remove(id: number) {
    await this.findOne(id)
    return this.product.delete({ where: { id } });
  }
}

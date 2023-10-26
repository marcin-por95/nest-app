import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';
import { UpdateOrderDTO } from "./dtos/update-order-dto";

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      include: { product: true, client: true },
    });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      include: { product: true, client: true },
    });
  }

  public deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public async create(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { productId, clientId, ...otherData } = orderData;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await this.prismaService.order.create({
        data: {
          ...otherData,
          product: {
            connect: { id: productId },
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          client: {
            connect: { id: clientId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025')
        throw new BadRequestException("Product doesn't exist");
      throw error;
    }
  }

  public updateById(
    id: Order['id'],
    orderData: UpdateOrderDTO,
  ): Promise<Order> {
    const { productId, clientId, ...otherData } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        ...otherData,
        product: {
          connect: { id: productId },
        },
        client: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          connect: { id: clientId },
        },
      },
    });
  }
}
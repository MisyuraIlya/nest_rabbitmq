import { Injectable } from '@nestjs/common';
import { OrderDto } from './order.dto';

@Injectable()
export class AppService {
  orders: OrderDto[] = [];

  handleCreateOrder(dto: OrderDto) {
    console.log('dto',dto)
    this.orders.push(dto)
  }

  getOrders(){
    return this.orders
  }
}



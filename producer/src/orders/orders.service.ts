import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(@Inject("ORDERS_SERVICE") private rabbitClient: ClientProxy){}


  create(createOrderDto: CreateOrderDto) {
    this.rabbitClient.emit("order-placed", createOrderDto);
    return 'This action adds a new order';
  }

  getOrders(){
    return this.rabbitClient.
    send({cmd:'fetch-orders'},{})
    .pipe(timeout(5000))
  }

}

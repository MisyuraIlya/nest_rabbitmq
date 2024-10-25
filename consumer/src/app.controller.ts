import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { OrderDto } from './order.dto';

@Controller('consumer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello2(): string {
    return 'hello';
  }
  
  @EventPattern("order-placed")
  createOrder(@Payload() order: OrderDto) {
    return this.appService.handleCreateOrder(order);
  }

  @MessagePattern({cmd: 'fetch-orders'})
  getOrders(@Ctx() context: RmqContext) {
    console.log('context',context)
    return this.appService.getOrders();
  }
  
}

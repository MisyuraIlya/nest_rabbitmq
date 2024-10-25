import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Start the HTTP server
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Optional: set a global prefix if needed
  await app.listen(3000);
  console.log('HTTP server is running on port 3000');

  // Start the RabbitMQ microservice
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
      queue: 'orders-queue',
    },
  });

  await app.startAllMicroservices();
  console.log('Microservice connected to RabbitMQ and listening for messages');
}

bootstrap();

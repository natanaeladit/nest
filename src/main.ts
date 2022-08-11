import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const rabbitApp= await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls:['amqp://localhost:5672'],
      queue: 'books_queue',
      queueOptions: {
        durable: false
      }
    }
  })
  await rabbitApp.listen();
  console.log('Rabbitmq is running');

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Web app is running');
}
bootstrap();

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // RabbitMQ Payload: {"pattern": "test", "data":[1,2,3]}
  @EventPattern("test")
  getEventMessage(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log("data is -> ", data) // always undefined
    console.log(
      "content of message is -> ",
      JSON.parse(
        context.getMessage().content.toString() // from buffer to string
      )
    )
  }

  // RabbitMQ Payload: {"pattern": "test", "data":[1,2,3]}
  @EventPattern("test")
  getEventMessage2(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log("data2 is -> ", data) // always undefined
    console.log(
      "content2 of message is -> ",
      JSON.parse(
        context.getMessage().content.toString() // from buffer to string
      )
    )
  }

  // RabbitMQ Payload: {"pattern": "notifications", "data":[1,2,3]}
  @MessagePattern('notifications')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    console.log(`Pattern: ${context.getPattern()}`);
    console.log(data);
    data.forEach(element => {
      console.log(element);
    });
  }
}

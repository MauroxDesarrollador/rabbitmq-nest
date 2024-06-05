import { Body, Controller, Get, Post,OnApplicationBootstrap } from '@nestjs/common';
import {RabbitService} from './rabbit.service'

@Controller('rabbit')
export class RabbitController {
  constructor(private readonly RabbitService: RabbitService) {}

  @Post('publish')
  async publishMessage(@Body() data) {
    await this.RabbitService.publishMessage(data);
    return { message: 'Message published successfully' };
  }

  onApplicationBootstrap() {
    this.RabbitService.subscribeToQueue();
  }
}

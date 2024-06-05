import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';
@Injectable()
export class RabbitService {
    private connection: amqp.Connection;
    private channel: amqp.Channel;
    private queue = 'my-queue';
  
    async onModuleInit() {
      this.connection = await amqp.connect('amqp://admin:mypassword@localhost:5672');
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queue, { durable: false });
    }
  
    async publishMessage(message) {
      await this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
    }
  
    async subscribeToQueue() {
      await this.channel.consume(this.queue, (msg) => {
        if (msg !== null) {
          console.log(`Received message: ${msg.content.toString()}`);
          this.channel.ack(msg);
        }
      });
    }
}

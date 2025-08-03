import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['14.241.251.180:9092'],
          },
          consumer: {
            groupId: 'chat-consumer',
          },
        },
      },
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://kalo:kalo@14.241.251.180:5672'],
          queue: 'chat-queue',
        },
      },
      {
        name: 'REDIS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: '14.241.251.180',
          port: 6301,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const kafka = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['14.241.251.180:9092'],
        },
        consumer: {
          groupId: 'search-consumer',
        },
      },
    }
  );
  const rabbitmq = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://14.241.251.180:5672'],
        queue: 'search-queue',
      },
    }
  );
  const redis = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: '14.241.251.180',
        port: 6301,
      },
    }
  );
  await Promise.all([
    await kafka.listen(),
    await rabbitmq.listen(),
    await redis.listen(),
  ]);
}

bootstrap();

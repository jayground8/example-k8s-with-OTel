import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { otelSDK } from 'src/opentelemetry';

async function bootstrap() {
  console.log(process.env.NODE_IP);
  console.log(process.env.OTEL_LOG_LEVEL);
  otelSDK.start();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.json(),
          ),
        }),
      ],
    }),
  });
  await app.listen(3000);
}
bootstrap();

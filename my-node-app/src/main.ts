import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { trace } from '@opentelemetry/api';
import * as winston from 'winston';
import { otelSDK } from 'src/opentelemetry';

async function bootstrap() {
  otelSDK.start();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            // winston instrumentation library doesn't work in Nestjs.
            // https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1745
            // followed the idea from the issue to fix the problem.
            winston.format.printf((info) => {
              const activeSpan = trace.getActiveSpan();
              const metaData: { span_id?: string; trace_id?: string } = {};
              if (activeSpan) {
                metaData.span_id = activeSpan.spanContext().spanId;
                metaData.trace_id = activeSpan.spanContext().traceId;
              }
              return `[${info.level.toUpperCase()}] [trace_id=${
                metaData.trace_id
              } span_id=${metaData.span_id}] ${info.message} ${JSON.stringify({
                ...info,
              })}`;
            }),
          ),
        }),
      ],
    }),
  });
  await app.listen(3000);
}
bootstrap();

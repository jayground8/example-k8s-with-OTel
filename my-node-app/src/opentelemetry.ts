import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';

export const otelSDK = new NodeSDK({
  serviceName: `api-node`,
  traceExporter: new OTLPTraceExporter({
    url: `http://${process.env.NODE_IP}:4318/v1/traces`,
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
    new NestInstrumentation(),
    new WinstonInstrumentation({
      enabled: true,
      logHook: (_span, record) => {
        record['resource.service.name'] = 'test-service';
      },
    }),
  ],
});

process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});

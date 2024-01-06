import { Injectable, OnModuleInit } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class PrometheusService implements OnModuleInit {
  private register: client.Registry;

  onModuleInit() {
    const defaultLabels = { service: 'node-api' };
    const collectDefaultMetric = client.collectDefaultMetrics;
    const Registry = client.Registry;
    const register = new Registry();
    register.setDefaultLabels(defaultLabels);
    collectDefaultMetric({ register });
    this.register = register;
  }

  getRegister() {
    return this.register;
  }
}

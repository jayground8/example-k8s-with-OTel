import { Controller, Get, Res } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';
import { Response } from 'express';

@Controller('prometheus')
export class PrometheusController {
  constructor(private readonly prometheusService: PrometheusService) {}

  @Get('metrics')
  getMetrics(@Res() res: Response) {
    const register = this.prometheusService.getRegister();
    res.setHeader('Content-Type', register.contentType);
    register.metrics().then((data) => res.status(200).send(data));
  }
}

import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { PrometheusModule } from './prometheus/prometheus.module';

@Module({
  imports: [HttpModule, PrometheusModule],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}

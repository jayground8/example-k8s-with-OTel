import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    this.logger.log('getHello');
    return this.appService.getHello();
  }

  @Get('/other')
  getHelloFromOther() {
    this.logger.log('getHelloFromOther');
    return this.appService.getHelloFromOther();
  }
}

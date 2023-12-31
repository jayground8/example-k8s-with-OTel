import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getHelloFromOther(): Promise<string> {
    const { data } = await firstValueFrom(
      this.httpService.get<string>('http://my-python-app-svc:3000/').pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    console.log('Hello API');
    return { message: 'Hello API' };
  }
}

import { Injectable } from '@nestjs/common';
import { Message } from '@monorock/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return {
      message: `Welcome to api, version:${
        process.env.BUILD_ID ? process.env.BUILD_ID : 'local build'
      }`
    };
  }
}

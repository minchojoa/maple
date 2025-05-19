import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): string {
    return "App Service response";
  }
}
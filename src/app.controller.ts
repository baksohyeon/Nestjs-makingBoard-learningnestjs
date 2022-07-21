import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  // read
  @Get('')
  healthCheck(): string {
    return process.env.LOCAL_DATABASE_USERNAME;
  }
}

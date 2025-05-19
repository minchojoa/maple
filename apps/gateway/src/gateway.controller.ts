import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('gateway')
export class GatewayController {
  @UseGuards(AuthGuard)
  @Get('secure')
  secure(@Req() req: Request) {
    return { message: 'Access granted', user: (req as any).user };
  }
}
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  createEvent(@Body() body: any) {
    return this.eventService.createEvent(body);
  }

  @UseGuards(AuthGuard)
  @Post('claim')
  claimReward(@Body() body: any, @Req() req: Request) {
    return this.eventService.claimReward(body, (req as any).user);
  }

  @Get('all')
  getAllEvents() {
    return this.eventService.getAllEvents();
  }

  @UseGuards(AuthGuard)
  @Get('claims')
  getAllClaims(@Req() req: Request) {
    return this.eventService.getAllClaims((req as any).user);
  }
}
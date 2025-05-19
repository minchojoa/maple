import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [GatewayController],
  providers: [AuthGuard],
})
export class AppModule {}
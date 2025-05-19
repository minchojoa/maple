import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { AuthGuard } from './auth.guard';
import { RewardClaim, RewardClaimSchema } from './schemas/reward-claim.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/rewards'),
    MongooseModule.forFeature([{ name: RewardClaim.name, schema: RewardClaimSchema }])
  ],
  controllers: [EventController],
  providers: [EventService, AuthGuard],
})
export class AppModule {}
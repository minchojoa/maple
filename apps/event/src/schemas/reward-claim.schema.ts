import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardClaimDocument = RewardClaim & Document;

@Schema()
export class RewardClaim {
  @Prop()
  username!: string;

  @Prop()
  eventId!: number;

  @Prop()
  status!: 'SUCCESS' | 'FAILED';

  @Prop({ default: Date.now })
  requestedAt!: Date;
}

export const RewardClaimSchema = SchemaFactory.createForClass(RewardClaim);
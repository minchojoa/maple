import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RewardClaim, RewardClaimDocument } from './schemas/reward-claim.schema';

interface Event {
  id: number;
  title: string;
  rewardPoints?: number;
}

@Injectable()
export class EventService {
  private events: Event[] = [];

  constructor(
    @InjectModel(RewardClaim.name) private rewardClaimModel: Model<RewardClaimDocument>,
  ) {}

  createEvent(body: any): Event {
    const event: Event = { id: this.events.length + 1, ...body };
    this.events.push(event);
    return event;
  }

  getAllEvents(): Event[] {
    return this.events;
  }

  async claimReward(body: any, user: any) {
    const event = this.events.find(e => e.id === body.eventId);
    if (!event) {
      await this.rewardClaimModel.create({
        username: user.username,
        eventId: body.eventId,
        status: 'FAILED',
      });
      return { message: 'Event not found' };
    }

    const alreadyClaimed = await this.rewardClaimModel.findOne({
      username: user.username,
      eventId: event.id,
    });

    if (alreadyClaimed) {
      return { message: 'Already claimed' };
    }

    if (!body.questCompleted) {
      await this.rewardClaimModel.create({
        username: user.username,
        eventId: event.id,
        status: 'FAILED',
      });
      return { message: 'Quest not completed' };
    }

    await this.rewardClaimModel.create({
      username: user.username,
      eventId: event.id,
      status: 'SUCCESS',
    });

    return { message: 'Reward granted', points: event.rewardPoints || 100 };
  }

  async getAllClaims(user: any) {
    if (user.role !== 'ADMIN' && user.role !== 'AUDITOR') {
      return { message: 'Access denied' };
    }
    return this.rewardClaimModel.find().exec();
  }
}
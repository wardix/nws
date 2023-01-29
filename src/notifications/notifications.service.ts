import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private eventEmitter: EventEmitter2) { }

  create(createNotificationDto: CreateNotificationDto) {
    const {event, ...notification } = createNotificationDto;
    const validEvent = [
      'incoming.call',
      'incoming.chat',
      'incoming.sms'
    ]
    const isValidEvent = validEvent.includes(event)
    if (!isValidEvent) {
      return;
    }
    this.eventEmitter.emit(event, notification);
  }
}

import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  providers: [MailService],
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
    }),
  ],
  exports: [MailService],
})
export class MailModule {}

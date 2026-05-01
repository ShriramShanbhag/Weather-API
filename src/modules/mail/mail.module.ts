import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { BullModule } from '@nestjs/bullmq';
import { MailProcessor } from './processors/mail.processor';

@Module({
  providers: [MailService],
  imports: [
    BullModule.registerQueue({
      name: 'email-queue',
    }),
  ],
  exports: [MailService, MailProcessor],
})
export class MailModule { }

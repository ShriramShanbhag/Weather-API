import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class MailService {
  constructor(@InjectQueue('email-queue') private emailQueue: Queue) {}

  async sendWelcomeEmail(email: string) {
    await this.emailQueue.add('send-welcome', {
      to: email,
      subject: 'Welcome to Weather API!',
      content: 'Thank you for signing up for our weather updates.',
    });

    console.log(`Job added to queue for: ${email}`);
  }
}

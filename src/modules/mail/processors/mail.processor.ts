import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('email-queue')
export class MailProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(`Processing job ${job.id} of type ${job.name}...`);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`Email sent to: ${job.data.to}`);
    return {};
  }
}

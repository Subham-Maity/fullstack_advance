const {Worker} = require('bullmq');

const emailWorker = new Worker('email-queue', async job => {
  // send email
  console.log(job.data);
}
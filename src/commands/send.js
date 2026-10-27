import { requireMailConfig } from '../config.js';
import { sendToKindle } from '../sendToKindle.js';
import { epub } from './epub.js';

export const send = {
  usage: 'send <article-url>',
  description: 'Convert a web article and email it to your Kindle',
  async run(url) {
    requireMailConfig();

    const { filePath, title } = await epub.run(url);

    console.log('Sending to Kindle...');
    const to = await sendToKindle(filePath, title);
    console.log(`Sent to ${to}`);
  },
};

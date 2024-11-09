import { doc } from './doc.js';
import { parseArgumentsIntoOptions } from './usage.js';

async function generateDocs(options) {
  try {
    await doc(options.providerName).finally(() => {
      logger.info(`finished documenting!`);
    });
  } catch (err) {
    logger.error(err);
  }
}

export async function main(args) {

  const options = parseArgumentsIntoOptions(args);

  await generateDocs(options).finally(() => {
    process.exit(0);
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });

}
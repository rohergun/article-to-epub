#!/usr/bin/env node
import { epub } from '../src/commands/epub.js';


const COMMANDS = { epub };

const USAGE = `Usage: read-later-epub <command> <article-url>

Commands:
${Object.values(COMMANDS)
  .map((cmd) => `  ${cmd.usage.padEnd(24)}${cmd.description}`)
  .join('\n')}`;

function parseUrl(input) {
  try {
    const url = new URL(input);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    return url.href;
  } catch {
    throw new Error(`Invalid URL: ${input}\n${USAGE}`);
  }
}

function parseArgs(argv) {
  const flags = argv.filter((arg) => arg.startsWith('-'));
  const [commandName, input] = argv.filter((arg) => !arg.startsWith('-'));
  return { commandName, input, help: flags.includes('-h') || flags.includes('--help') };
}

async function main() {
  const { commandName, input, help } = parseArgs(process.argv.slice(2));
  if (help || !commandName) {
    console.log(USAGE);
    process.exit(help ? 0 : 1);
  }

  const command = COMMANDS[commandName];
  if (!command) throw new Error(`Unknown command: ${commandName}\n${USAGE}`);
  if (!input) throw new Error(`Missing article URL\nUsage: read-later-epub ${command.usage}`);

  await command.run(parseUrl(input));
}

main().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});

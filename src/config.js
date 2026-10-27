import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ENV_FILE = fileURLToPath(new URL('../.env', import.meta.url));

// Variables already set in the shell take precedence over .env.
if (existsSync(ENV_FILE)) process.loadEnvFile(ENV_FILE);

export const config = {
  kindleEmail: process.env.KINDLE_EMAIL,
  senderEmail: process.env.SENDER_EMAIL || process.env.SMTP_USER,
  smtp: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

export function requireMailConfig() {
  const missing = Object.entries({
    KINDLE_EMAIL: config.kindleEmail,
    SMTP_HOST: config.smtp.host,
    SMTP_USER: config.smtp.user,
    SMTP_PASS: config.smtp.pass,
  })
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(`Missing ${missing.join(', ')} in ${ENV_FILE}\nSee .env.example for the required settings.`);
  }
  return config;
}

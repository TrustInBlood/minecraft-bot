export interface Config {
  discordToken: string;
  minecraftServer: string;
  pollIntervalMs: number;
}

function getEnvOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getEnvOrDefault(key: string, defaultValue: string): string {
  return process.env[key] || defaultValue;
}

function getEnvNumberOrDefault(key: string, defaultValue: number): number {
  const value = process.env[key];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }
  return parsed;
}

export function loadConfig(): Config {
  return {
    discordToken: getEnvOrThrow("DISCORD_TOKEN"),
    minecraftServer: getEnvOrDefault("MINECRAFT_SERVER", "198.133.237.27:10259"),
    pollIntervalMs: getEnvNumberOrDefault("POLL_INTERVAL_MS", 60000),
  };
}

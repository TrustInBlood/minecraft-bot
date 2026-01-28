import "dotenv/config";
import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import { loadConfig } from "./config.js";
import { getServerStatus } from "./minecraft.js";

const config = loadConfig();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

async function updatePresence(): Promise<void> {
  const status = await getServerStatus(config.minecraftServer);

  let activityName: string;
  if (!status.online) {
    activityName = "Server Offline";
  } else {
    activityName = `${status.players.online}/${status.players.max} players`;
  }

  client.user?.setActivity(activityName, { type: ActivityType.Watching });
  console.log(`[${new Date().toISOString()}] Updated presence: ${activityName}`);
}

function startPolling(): void {
  updatePresence();

  setInterval(() => {
    updatePresence();
  }, config.pollIntervalMs);
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user?.tag}`);
  console.log(`Monitoring server: ${config.minecraftServer}`);
  console.log(`Poll interval: ${config.pollIntervalMs}ms`);
  startPolling();
});

async function shutdown(): Promise<void> {
  console.log("\nShutting down...");
  client.destroy();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

client.login(config.discordToken);

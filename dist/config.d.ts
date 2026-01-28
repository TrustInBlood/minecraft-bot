export interface Config {
    discordToken: string;
    minecraftServer: string;
    pollIntervalMs: number;
}
export declare function loadConfig(): Config;

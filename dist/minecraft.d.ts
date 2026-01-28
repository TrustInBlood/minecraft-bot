export interface ServerStatus {
    online: boolean;
    players: {
        online: number;
        max: number;
    };
}
export declare function getServerStatus(serverAddress: string): Promise<ServerStatus>;

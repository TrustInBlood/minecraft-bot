export async function getServerStatus(serverAddress) {
    const url = `https://api.mcstatus.io/v2/status/java/${serverAddress}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`mcstatus.io API error: ${response.status} ${response.statusText}`);
            return { online: false, players: { online: 0, max: 0 } };
        }
        const data = (await response.json());
        if (!data.online) {
            return { online: false, players: { online: 0, max: 0 } };
        }
        return {
            online: true,
            players: {
                online: data.players?.online ?? 0,
                max: data.players?.max ?? 0,
            },
        };
    }
    catch (error) {
        console.error("Failed to fetch server status:", error);
        return { online: false, players: { online: 0, max: 0 } };
    }
}

import { Players, ReplicatedStorage } from "@rbx-services";

// Create remote events for client-server communication
const remotes = new Instance("Folder");
remotes.Name = "Remotes";
remotes.Parent = ReplicatedStorage;

const saveEvent = new Instance("RemoteEvent");
saveEvent.Name = "SaveData";
saveEvent.Parent = remotes;

// Set up each player with leaderstats
Players.PlayerAdded.Connect((player) => {
  if (!player) {
    return;
  }

  print(`${player.Name} joined the game`);

  const leaderstats = new Instance("Folder");
  leaderstats.Name = "leaderstats";
  leaderstats.Parent = player;

  const gemsValue = new Instance("IntValue");
  gemsValue.Name = "Gems";
  gemsValue.Value = 0;
  gemsValue.Parent = leaderstats;

  const clicksValue = new Instance("IntValue");
  clicksValue.Name = "Clicks";
  clicksValue.Value = 0;
  clicksValue.Parent = leaderstats;
});

Players.PlayerRemoving.Connect((player) => {
  if (!player) {
    return;
  }
  print(`${player.Name} left the game`);
});

// Handle save requests from client
saveEvent.OnServerEvent.Connect((player?: Player, args?: unknown) => {
  if (!player) {
    return;
  }
  const data = args as { gems: number; clicks: number };
  const leaderstats = player.FindFirstChild("leaderstats");
  if (leaderstats) {
    const gemsVal = leaderstats.FindFirstChild("Gems");
    const clicksVal = leaderstats.FindFirstChild("Clicks");
    if (gemsVal) {
      (gemsVal as IntValue).Value = data.gems;
    }
    if (clicksVal) {
      (clicksVal as IntValue).Value = data.clicks;
    }
  }
  print(`Saved data for ${player.Name}: ${data.gems} gems, ${data.clicks} clicks`);
});

print("Gem Miner server started!");

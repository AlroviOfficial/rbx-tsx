import { Players } from "@rbx-services";

Players.PlayerAdded.Connect((player) => {
  print(`${player!.Name} joined the game`);
});

print("Server started!");

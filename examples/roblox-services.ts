/**
 * Roblox services and Instance API usage
 */

const Players = game.GetService("Players");
const ReplicatedStorage = game.GetService("ReplicatedStorage");
const RunService = game.GetService("RunService");

// Create UI hierarchy
const screenGui = new Instance("ScreenGui");
screenGui.Name = "AppUI";
screenGui.ResetOnSpawn = false;

const frame = new Instance("Frame");
frame.Name = "MainFrame";
frame.Size = new UDim2(1, 0, 1, 0);
frame.Parent = screenGui;

const textLabel = new Instance("TextLabel");
textLabel.Name = "Title";
textLabel.Size = new UDim2(1, 0, 0, 50);
textLabel.Text = "Hello from rbx-tsx";
textLabel.Parent = frame;

// Attach to PlayerGui
const player = Players.LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");
screenGui.Parent = playerGui;

// Heartbeat connection
RunService.Heartbeat.Connect((dt: number) => {
  // Update logic
});

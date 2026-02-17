import React from "react";
import { createRoot } from "react-roblox";
import App from "./App";

const Players = game.GetService("Players");
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const screenGui = new Instance("ScreenGui");
screenGui.Name = "AppUI";
screenGui.Parent = playerGui;
screenGui.ResetOnSpawn = false;

const root = createRoot(screenGui);
root.render(<App />);

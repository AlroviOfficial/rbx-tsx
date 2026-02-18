import React from "react";
import { createRoot } from "react-roblox";
import { Players } from "@rbx-services";
import App from "./App";
import "./game.css";

// Mount the UI onto the player's ScreenGui
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const screenGui = new Instance("ScreenGui");
screenGui.Name = "GemClicker";
screenGui.Parent = playerGui;
screenGui.ResetOnSpawn = false;
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;

// Stylesheet is auto-attached to the createRoot container
const root = createRoot(screenGui);
root.render(<App />);

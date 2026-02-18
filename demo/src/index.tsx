import React from "react";
import { createRoot } from "react-roblox";
import { Players } from "@rbx-services";
import App from "./App";
import createStyleSheet from "./game.css";

// Mount the UI onto the player's ScreenGui
const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");

const screenGui = new Instance("ScreenGui");
screenGui.Name = "GemClicker";
screenGui.Parent = playerGui;
screenGui.ResetOnSpawn = false;
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling;

// Create and attach the compiled stylesheet
const styleSheet = createStyleSheet();
styleSheet.Parent = screenGui;

// Render the React tree
const root = createRoot(screenGui);
root.render(<App />);

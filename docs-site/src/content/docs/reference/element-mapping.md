---
title: Element Mapping
description: How HTML/JSX elements map to Roblox GUI classes, with default behaviors.
---

HTML elements written in JSX map to Roblox GUI classes automatically. Default props are
only applied when you don't specify them yourself.

| TSX | Roblox Class | Default behavior |
|-----|--------------|------------------|
| `<div>` | `Frame` | |
| `<span>`, `<p>`, `<h1>`–`<h6>`, `<label>` | `TextLabel` | |
| `<button>`, `<a>` | `TextButton` | |
| `<input>`, `<textarea>` | `TextBox` | |
| `<img>` | `ImageLabel` | |
| `<canvas>` | `ViewportFrame` | |
| `<video>` | `VideoFrame` | |
| `<scroll>` | `ScrollingFrame` | |
| `<nav>`, `<header>`, `<footer>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<form>` | `Frame` | Transparent, auto-height, full-width |
| `<ul>`, `<ol>` | `Frame` | Vertical `UIListLayout` auto-injected |
| `<li>` | `Frame` | Transparent, auto-height, full-width |
| `<table>`, `<thead>`, `<tbody>`, `<tfoot>` | `Frame` | Vertical `UIListLayout` auto-injected |
| `<tr>` | `Frame` | Horizontal `UIListLayout` auto-injected |
| `<td>`, `<th>` | `TextLabel` | Transparent, auto-sized |
| `<dialog>` | `Frame` | Centered (`AnchorPoint` + `Position`) |
| `<select>` | `Frame` | Vertical `UIListLayout` auto-injected |
| `<option>`, `<summary>` | `TextButton` | |

Any Roblox GUI class name (e.g. `<Frame>`, `<ScrollingFrame>`, `<TextLabel>`) is passed
through directly.

See [JSX & React](/guides/jsx-react/) for the props mapping (`className`, `onClick`, etc.).

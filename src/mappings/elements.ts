/** HTML element → Roblox instance class mapping */
export const HTML_TO_ROBLOX: Record<string, string> = {
  div: "Frame",
  span: "TextLabel",
  p: "TextLabel",
  h1: "TextLabel",
  h2: "TextLabel",
  h3: "TextLabel",
  h4: "TextLabel",
  h5: "TextLabel",
  h6: "TextLabel",
  button: "TextButton",
  input: "TextBox",
  img: "ImageLabel",
  a: "TextButton",
  canvas: "ViewportFrame",
  label: "TextLabel",
  textarea: "TextBox",
  video: "VideoFrame",
  scroll: "ScrollingFrame",
};

/** Elements that can have a Text property */
export const TEXT_ELEMENTS = new Set([
  "TextLabel",
  "TextButton",
  "TextBox",
]);

/** Elements that cannot have Text property — text children become child TextLabels */
export const CONTAINER_ELEMENTS = new Set([
  "Frame",
  "ScrollingFrame",
  "ViewportFrame",
  "ImageLabel",
  "CanvasGroup",
]);

/** Known Roblox GUI classes (passthrough, no mapping needed) */
export const ROBLOX_GUI_CLASSES = new Set([
  "Frame",
  "ScrollingFrame",
  "TextLabel",
  "TextButton",
  "TextBox",
  "ImageLabel",
  "ImageButton",
  "ViewportFrame",
  "VideoFrame",
  "CanvasGroup",
  "BillboardGui",
  "SurfaceGui",
  "ScreenGui",
]);

/** Unsupported HTML elements that should produce a warning */
export const UNSUPPORTED_ELEMENTS = new Set([
  "table", "tr", "td", "th", "thead", "tbody", "tfoot",
  "form", "select", "option", "optgroup",
  "ul", "ol", "li",
  "nav", "header", "footer", "main", "section", "article", "aside",
  "details", "summary", "dialog",
  "iframe", "embed", "object",
  "audio", "source", "track",
  "map", "area",
  "svg", "circle", "rect", "path", "line", "polygon",
]);

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

  // Semantic containers
  nav: "Frame",
  header: "Frame",
  footer: "Frame",
  main: "Frame",
  section: "Frame",
  article: "Frame",
  aside: "Frame",
  form: "Frame",

  // List elements
  ul: "Frame",
  ol: "Frame",
  li: "Frame",

  // Table elements
  table: "Frame",
  thead: "Frame",
  tbody: "Frame",
  tfoot: "Frame",
  tr: "Frame",
  td: "TextLabel",
  th: "TextLabel",

  // Interactive/overlay
  dialog: "Frame",
  details: "Frame",
  summary: "TextButton",

  // Form controls
  select: "Frame",
  option: "TextButton",
  optgroup: "Frame",
};

/** Elements that can have a Text property */
export const TEXT_ELEMENTS = new Set(["TextLabel", "TextButton", "TextBox"]);

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
  "iframe",
  "embed",
  "object",
  "audio",
  "source",
  "track",
  "map",
  "area",
  "svg",
  "circle",
  "rect",
  "path",
  "line",
  "polygon",
]);

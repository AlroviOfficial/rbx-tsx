/** HTML event prop → Roblox event mapping */
export interface RobloxEventMapping {
  /** "Event" or "Change" */
  kind: "Event" | "Change";
  /** The Roblox event/property name */
  name: string;
  /** Parameter remapping info */
  params?: EventParamMapping;
}

export interface EventParamMapping {
  /** The roblox callback receives (rbx, ...args) — how to map the React (e) param */
  robloxParams: string[];
  /** Which roblox param index maps to the React event param (0-based, after rbx) */
  eventArgIndex: number;
}

export const EVENT_MAP: Record<string, RobloxEventMapping> = {
  onClick: {
    kind: "Event",
    name: "Activated",
    params: {
      robloxParams: ["_rbx", "inputObject", "_clickCount"],
      eventArgIndex: 1,
    },
  },
  onMouseEnter: {
    kind: "Event",
    name: "MouseEnter",
    params: {
      robloxParams: ["_rbx", "x", "y"],
      eventArgIndex: 1,
    },
  },
  onMouseLeave: {
    kind: "Event",
    name: "MouseLeave",
    params: {
      robloxParams: ["_rbx", "x", "y"],
      eventArgIndex: 1,
    },
  },
  onChange: {
    kind: "Change",
    name: "Text",
    params: {
      robloxParams: ["rbx"],
      eventArgIndex: 0,
    },
  },
  onFocus: {
    kind: "Event",
    name: "Focused",
    params: {
      robloxParams: ["_rbx"],
      eventArgIndex: -1,
    },
  },
  onBlur: {
    kind: "Event",
    name: "FocusLost",
    params: {
      robloxParams: ["_rbx", "enterPressed", "_inputThatCausedFocusLoss"],
      eventArgIndex: -1,
    },
  },
  onScroll: {
    kind: "Change",
    name: "CanvasPosition",
    params: {
      robloxParams: ["rbx"],
      eventArgIndex: 0,
    },
  },
  onSubmit: {
    kind: "Event",
    name: "FocusLost",
    params: {
      robloxParams: ["rbx", "enterPressed", "_inputThatCausedFocusLoss"],
      eventArgIndex: -1,
    },
  },
};

/** Events with no Roblox equivalent */
export const UNSUPPORTED_EVENTS = new Set([
  "onDoubleClick",
  "onContextMenu",
  "onKeyDown",
  "onKeyUp",
  "onKeyPress",
  "onDrag",
  "onDragStart",
  "onDragEnd",
  "onDrop",
  "onTouchStart",
  "onTouchEnd",
  "onTouchMove",
  "onWheel",
  "onCopy",
  "onCut",
  "onPaste",
  "onAnimationStart",
  "onAnimationEnd",
  "onTransitionEnd",
  "onLoad",
  "onError",
]);

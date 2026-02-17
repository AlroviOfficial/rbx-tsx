import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  createContext,
  useContext,
} from "react";
import { Players, RunService } from "@rbx-services";

// ── Types ──

interface ItemStats {
  damage?: number;
  defense?: number;
  speed?: number;
}

type Rarity = "common" | "uncommon" | "rare" | "legendary";

interface Item {
  id: string;
  name: string;
  rarity: Rarity;
  quantity: number;
  equipped?: boolean;
  icon: string;
  stats?: ItemStats;
}

interface TooltipAPI {
  show: (text: string) => void;
  hide: () => void;
}

// ── Constants ──

const RARITY_ORDER: Record<string, number> = {
  common: 0,
  uncommon: 1,
  rare: 2,
  legendary: 3,
};

const MAX_EQUIPPED = 3;

// ── Context ──

const TooltipContext = createContext<TooltipAPI | null>(null);

// ── Sub-components ──

interface ItemSlotProps {
  item: Item;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEquip: (id: string) => void;
}

function ItemSlot({ item, isSelected, onSelect, onEquip }: ItemSlotProps) {
  const tooltip = useContext(TooltipContext);

  const handleClick = useCallback(() => {
    onSelect(item.id);
  }, [item.id, onSelect]);

  const handleDoubleClick = useCallback(() => {
    onEquip(item.id);
    tooltip?.hide();
  }, [item.id, onEquip, tooltip]);

  const totalStats = item.stats
    ? (item.stats.damage ?? 0) + (item.stats.defense ?? 0) + (item.stats.speed ?? 0)
    : 0;

  return (
    <button
      className={isSelected ? "item-slot selected" : "item-slot"}
      onClick={handleClick}
    >
      <span>{item.name}</span>
      {item.quantity > 1 && <span className="quantity">x{item.quantity}</span>}
      {item.equipped && <span className="equipped-badge">E</span>}
      {totalStats > 0 && <span className="stats-total">{`+${totalStats}`}</span>}
    </button>
  );
}

interface DetailPanelProps {
  item: Item | null;
  onEquip: (id: string) => void;
  onDrop: (id: string) => void;
}

function DetailPanel({ item, onEquip, onDrop }: DetailPanelProps) {
  if (!item) {
    return (
      <div className="detail-panel empty">
        <span>Select an item to view details</span>
      </div>
    );
  }

  const handleEquip = useCallback(() => {
    onEquip(item.id);
  }, [item.id, onEquip]);

  const handleDrop = useCallback(() => {
    onDrop(item.id);
  }, [item.id, onDrop]);

  return (
    <div className="detail-panel">
      <h1>{item.name}</h1>
      <span>{item.rarity}</span>
      {item.stats && (
        <div className="stats">
          {item.stats.damage !== undefined && (
            <span>DMG: {item.stats.damage}</span>
          )}
          {item.stats.defense !== undefined && (
            <span>DEF: {item.stats.defense}</span>
          )}
          {item.stats.speed !== undefined && (
            <span>SPD: {item.stats.speed}</span>
          )}
        </div>
      )}
      <div className="actions">
        <button className="equip-btn" onClick={handleEquip}>
          {item.equipped ? "Unequip" : "Equip"}
        </button>
        <button className="drop-btn" onClick={handleDrop}>
          Drop
        </button>
      </div>
    </div>
  );
}

// ── Main Component ──

export default function Inventory({ playerId }: { playerId: number }) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "rarity" | "quantity">("name");
  const [tooltipText, setTooltipText] = useState<string | null>(null);
  const containerRef = useRef<Frame>(null);

  // Load items on mount
  useEffect(() => {
    const player = Players.GetPlayerByUserId(playerId);
    if (!player) return;

    const loadedItems: Item[] = [];
    setItems(loadedItems);

    return () => {
      setItems([]);
    };
  }, [playerId]);

  // Heartbeat connection for animations
  useEffect(() => {
    const conn = RunService.Heartbeat.Connect(() => {});
    return () => {
      conn.Disconnect();
    };
  }, []);

  // Filtered and sorted items
  const displayItems = useMemo(() => {
    let result = items.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (sortBy === "name") {
      result = [...result].sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (sortBy === "rarity") {
      result = [...result].sort(
        (a, b) =>
          (RARITY_ORDER[a.rarity] ?? 0) - (RARITY_ORDER[b.rarity] ?? 0)
      );
    } else if (sortBy === "quantity") {
      result = [...result].sort((a, b) => b.quantity - a.quantity);
    }

    return result;
  }, [items, filter, sortBy]);

  const selectedItem = useMemo(() => {
    return selectedId
      ? items.find((item) => item.id === selectedId) ?? null
      : null;
  }, [items, selectedId]);

  const equippedCount = useMemo(() => {
    return items.filter((item) => item.equipped).length;
  }, [items]);

  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleEquip = useCallback(
    (id: string) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, equipped: !item.equipped } : item
        )
      );
    },
    []
  );

  const handleDrop = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      if (selectedId === id) {
        setSelectedId(null);
      }
    },
    [selectedId]
  );

  const handleFilterChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
    },
    []
  );

  const tooltipCtx = useMemo(
    () => ({
      show: (text: string) => setTooltipText(text),
      hide: () => setTooltipText(null),
    }),
    []
  );

  const headerText = `${items.length} items | ${equippedCount} equipped`;
  const canEquipMore = equippedCount < MAX_EQUIPPED;

  return (
    <div className="inventory" ref={containerRef}>
      <div className="inventory-header">
        <h1>Inventory</h1>
        <span>{headerText}</span>
        {!canEquipMore && <span className="equip-limit">Equip limit reached</span>}
      </div>

      <div className="search-bar">
        <input
          className="search-input"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <div className="sort-controls">
        <button
          className={sortBy === "name" ? "sort-btn active" : "sort-btn"}
          onClick={() => setSortBy("name")}
        >
          Name
        </button>
        <button
          className={sortBy === "rarity" ? "sort-btn active" : "sort-btn"}
          onClick={() => setSortBy("rarity")}
        >
          Rarity
        </button>
        <button
          className={sortBy === "quantity" ? "sort-btn active" : "sort-btn"}
          onClick={() => setSortBy("quantity")}
        >
          Qty
        </button>
      </div>

      <TooltipContext.Provider value={tooltipCtx}>
        <div className="inventory-body">
          <div className="item-grid">
            {displayItems.length > 0 ? (
              <>
                {displayItems.map((item) => (
                  <ItemSlot
                    key={item.id}
                    item={item}
                    isSelected={item.id === selectedId}
                    onSelect={handleSelect}
                    onEquip={handleEquip}
                  />
                ))}
              </>
            ) : (
              <span className="empty-message">
                {filter ? "No matching items" : "Your inventory is empty"}
              </span>
            )}
          </div>

          <DetailPanel
            item={selectedItem}
            onEquip={handleEquip}
            onDrop={handleDrop}
          />
        </div>
      </TooltipContext.Provider>

      {tooltipText && (
        <div className="tooltip">
          <span>{tooltipText}</span>
        </div>
      )}
    </div>
  );
}

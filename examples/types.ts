/**
 * Type aliases, interfaces, unions, and generics
 */

type ID = string | number;

interface BaseEntity {
  id: ID;
  createdAt: number;
}

interface Player extends BaseEntity {
  name: string;
  health: number;
}

type Rarity = "common" | "uncommon" | "rare" | "legendary";

interface Item {
  id: string;
  name: string;
  rarity: Rarity;
}

// Generic function
function getById<T extends BaseEntity>(entities: T[], id: ID): T | undefined {
  return entities.find((e) => e.id === id);
}

// Union type usage
function formatId(id: ID): string {
  return typeof id === "string" ? id : String(id);
}

const players: Player[] = [
  { id: "1", name: "Player1", health: 100, createdAt: 0 },
];

const found = getById(players, "1");
if (found) {
  console.log(found.name, found.health);
}

import { useState } from "react";
import SizeSelect from "./components/SizeSelect";
import Board from "./components/Board";

export type BoardSize = { label: string; cols: number; rows: number };

export const BOARD_SIZES: BoardSize[] = [
  { label: "4x4", cols: 4, rows: 4 },
  { label: "4x5", cols: 5, rows: 4 },
  { label: "5x6", cols: 6, rows: 5 },
  { label: "6x6", cols: 6, rows: 6 },
];

export default function App() {
  const [size, setSize] = useState<BoardSize | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Kiko Match Marking Board</h1>
      </header>

      {size === null ? (
        <SizeSelect onSelect={setSize} />
      ) : (
        <Board size={size} onExit={() => setSize(null)} />
      )}

      <footer className="app-footer">
        Kiko images from Neopets · game data from Jellyneo · a marking aid, not affiliated
      </footer>
    </div>
  );
}

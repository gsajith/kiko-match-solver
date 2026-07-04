import { useState } from "react";
import type { BoardSize } from "../App";
import KikoCell from "./KikoCell";

type Props = {
  size: BoardSize;
  onExit: () => void;
};

export default function Board({ size, onExit }: Props) {
  const total = size.cols * size.rows;
  // value per cell: the Kiko id, or "" for unset
  const [cells, setCells] = useState<string[]>(() => Array(total).fill(""));
  const [showImages, setShowImages] = useState(true);

  const setCell = (index: number, id: string) => {
    setCells((prev) => {
      const next = prev.slice();
      next[index] = id;
      return next;
    });
  };

  const clearBoard = () => setCells(Array(total).fill(""));

  const filled = cells.filter(Boolean).length;

  return (
    <section className="board-screen">
      <h2 className="board-title">{size.label}</h2>

      <div className="toolbar">
        <button
          className="tool-btn tool-back"
          onClick={onExit}
          title="Back to board size"
          aria-label="Back to board size selection"
        >
          ✕
        </button>

        <span className="toolbar-stat">
          <span className="toolbar-stat-label">Marked</span>
          <span className="toolbar-stat-value">
            {filled}/{total}
          </span>
        </span>

        <label className="toggle">
          <input
            type="checkbox"
            checked={showImages}
            onChange={(e) => setShowImages(e.target.checked)}
          />
          <span>Show images</span>
        </label>

        <button className="tool-btn" onClick={clearBoard}>
          Clear board
        </button>
      </div>

      <div className="board-panel">
        <div
          className="board-grid"
          style={{ gridTemplateColumns: `repeat(${size.cols}, 1fr)` }}
        >
          {cells.map((id, i) => (
            <KikoCell
              key={i}
              value={id}
              showImage={showImages}
              onChange={(newId) => setCell(i, newId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

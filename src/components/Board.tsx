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

  return (
    <section className="board-screen">
      <div className="toolbar">
        <button
          className="tool-btn tool-back"
          onClick={onExit}
          title="Back to board size"
          aria-label="Back to board size selection"
        >
          ✕
        </button>

        <span className="toolbar-title">{size.label}</span>

        <button className="tool-btn" onClick={clearBoard}>
          Clear board
        </button>

        <label className="toggle">
          <input
            type="checkbox"
            checked={showImages}
            onChange={(e) => setShowImages(e.target.checked)}
          />
          <span>Show images</span>
        </label>
      </div>

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
    </section>
  );
}

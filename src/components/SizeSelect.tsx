import { BOARD_SIZES, type BoardSize } from "../App";

type Props = { onSelect: (size: BoardSize) => void };

export default function SizeSelect({ onSelect }: Props) {
  return (
    <section className="size-select">
      <p className="size-select-prompt">Choose your board size</p>
      <div className="size-grid">
        {BOARD_SIZES.map((size) => (
          <button
            key={size.label}
            className="size-button"
            onClick={() => onSelect(size)}
          >
            <span className="size-button-label">{size.label}</span>
            <span className="size-button-count">{size.cols * size.rows} cards</span>
          </button>
        ))}
      </div>
    </section>
  );
}

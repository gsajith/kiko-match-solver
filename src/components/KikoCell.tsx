import { useEffect, useMemo, useRef, useState } from "react";
import { KIKOS, kikoImage } from "../kikos";

type Props = {
  value: string; // kiko id, or "" if unset
  showImage: boolean;
  onChange: (id: string) => void;
};

const byId = new Map(KIKOS.map((k) => [k.id, k]));

export default function KikoCell({ value, showImage, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = value ? byId.get(value) ?? null : null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return KIKOS;
    return KIKOS.filter((k) => k.name.toLowerCase().includes(q));
  }, [query]);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus + reset search when opening
  useEffect(() => {
    if (open) {
      setQuery("");
      inputRef.current?.focus();
    }
  }, [open]);

  const pick = (id: string) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div className="cell" ref={rootRef}>
      <button
        className={`cell-face ${selected ? "is-set" : "is-empty"}`}
        onClick={() => setOpen((o) => !o)}
        title={selected ? selected.name : "Pick a Kiko"}
      >
        {selected ? (
          <>
            {showImage && (
              <img
                className="cell-img"
                src={kikoImage(selected.id)}
                alt=""
                loading="lazy"
              />
            )}
            <span className="cell-name">{selected.name}</span>
          </>
        ) : (
          <span className="cell-placeholder">?</span>
        )}
      </button>

      {open && (
        <div className="menu">
          <div className="menu-search">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search 68 colors…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="menu-list">
            {selected && (
              <button className="menu-item menu-clear" onClick={() => pick("")}>
                <span className="menu-item-name">Clear cell</span>
              </button>
            )}
            {results.length === 0 && (
              <div className="menu-empty">No matches</div>
            )}
            {results.map((k) => (
              <button
                key={k.id}
                className={`menu-item ${k.id === value ? "is-current" : ""}`}
                onClick={() => pick(k.id)}
              >
                {showImage && (
                  <img
                    className="menu-item-img"
                    src={kikoImage(k.id)}
                    alt=""
                    loading="lazy"
                  />
                )}
                <span className="menu-item-name">{k.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

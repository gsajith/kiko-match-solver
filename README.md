# Kiko Match Marking Board

A simple marking board for **Kiko Match III**, the match-2 memory game on Neopets.
Use it to track which Kiko color is at each spot as you flip cards.

## Features

- Pick a board size: **4×4, 4×5, 5×6, 6×6**
- Each spot is a searchable dropdown over all **68 Kiko colors**
- Toggle between **names only** and **names + Kiko image**
- **Clear board** button to reset all marks
- **✕** button to go back and pick a new board size

## Develop

```bash
npm install
npm run dev
```

Open the printed local URL.

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

This is a standard Vite app — Vercel detects it automatically.

- **CLI:** `npm i -g vercel && vercel`
- **Dashboard:** push to GitHub and "Import Project" — no config needed.
  (Build command `npm run build`, output directory `dist`.)

## Notes

Kiko card images load from `pets.neopets.com`. Color list and game data
come from [Jellyneo's Kiko Match III guide](https://www.jellyneo.net/?go=kiko_match_iii).
This is an unofficial fan-made marking aid.

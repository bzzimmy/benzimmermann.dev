const COLS = 56;
const ROWS = 8;
const CELL = 12;
const WIDTH = COLS * CELL;
const HEIGHT = ROWS * CELL;

type Block = {
  x: number;
  y: number;
  opacity: number;
  flicker?: { delay: number; duration: number };
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeBlocks(seed: number): Block[] {
  const rand = mulberry32(seed);
  const blocks: Block[] = [];
  let h = 4;
  for (let c = 0; c < COLS; c++) {
    const r = rand();
    h += r < 0.2 ? -1 : r > 0.8 ? 1 : 0;
    h = Math.max(2, Math.min(ROWS - 1, h));
    for (let d = 0; d < h; d++) {
      if (d >= 2 && rand() < 0.1) continue;
      const opacity = Math.max(0.12, 0.7 - d * 0.11 + (rand() - 0.5) * 0.08);
      const block: Block = { x: c * CELL, y: (ROWS - h + d) * CELL, opacity };
      if (rand() < 0.08) {
        block.flicker = { delay: rand() * 8, duration: 3 + rand() * 4 };
      }
      blocks.push(block);
    }
  }
  return blocks;
}

const blocks = makeBlocks(7);

export function Blocks({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMax meet"
      className={`pointer-events-none w-full ${className}`}
      style={{ height: HEIGHT }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="blocks-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="blocks-mask">
          <rect width={WIDTH} height={HEIGHT} fill="url(#blocks-fade)" />
        </mask>
      </defs>
      <g mask="url(#blocks-mask)" fill="currentColor">
        {blocks.map((b, i) => (
          <rect
            key={i}
            x={b.x + 0.5}
            y={b.y + 0.5}
            width={CELL - 1}
            height={CELL - 1}
            className={b.flicker ? "animate-block-flicker" : undefined}
            style={
              {
                opacity: b.opacity,
                "--o": b.opacity,
                ...(b.flicker && {
                  animationDelay: `${b.flicker.delay}s`,
                  animationDuration: `${b.flicker.duration}s`,
                }),
              } as React.CSSProperties
            }
          />
        ))}
      </g>
    </svg>
  );
}

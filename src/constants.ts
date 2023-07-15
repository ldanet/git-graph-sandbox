export const GRID_SIZE = 60;

export const HEX_SIZE = GRID_SIZE / Math.sqrt(3);

export const OLD_SNAP = {
  x: (value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  },
  y: (value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  },
};

export const SNAP = {
  points: (point: { x: number; y: number }) => {
    // Convert pixel to hex coordinate
    // https://www.redblobgames.com/grids/hexagons/#hex-to-pixel
    const q = ((2 / 3) * point.x) / HEX_SIZE;
    const r = ((-1 / 3) * point.x + (Math.sqrt(3) / 3) * point.y) / HEX_SIZE;
    const [hexQ, hexR] = axial_round(q, r);
    // And back again to pixels to get the center of the hexagon
    const x = HEX_SIZE * ((3 / 2) * hexQ);
    const y = HEX_SIZE * ((Math.sqrt(3) / 2) * hexQ + Math.sqrt(3) * hexR);
    return { x, y };
  },
};

// from https://observablehq.com/@jrus/hexround
const axial_round = (q: number, r: number): [number, number] => {
  const qGrid = Math.round(q);
  const rGrid = Math.round(r);
  const rQ = q - qGrid; // remainder
  const rR = r - rGrid; // remainder
  if (Math.abs(rQ) >= Math.abs(rR)) {
    return [
      qGrid + Math.round(rQ + 0.5 * rR), // q
      rGrid, // r
    ];
  } else {
    return [
      qGrid, // q
      rGrid + Math.round(rR + 0.5 * rQ), // r
    ];
  }
};

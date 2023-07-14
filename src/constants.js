export const GRID_SIZE = 80;

export const SNAP = {
  x: (value) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  },
  y: (value) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  }
};

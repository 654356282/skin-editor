export function px(x: number) {
  return `${x}px`;
}

export function vpx(x: number, viewPortWidth = 375, base = 375) {
  return `${(x / base) * viewPortWidth}px`;
}

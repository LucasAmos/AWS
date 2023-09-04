export function multiply(a, b) {
  if ((a === 0) & (b === 0)) {
    throw new Error("values cannot both be zero");
  }
  return a * b;
}

import { add, multiply } from "./operands";

export function calculation(a, b) {
  return multiply(a, b) - add(a, b);
}

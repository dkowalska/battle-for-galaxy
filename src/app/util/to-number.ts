export function toNumberOrZero(str: string): number {
  const num = Number(str);
  return num ? num : 0;
}

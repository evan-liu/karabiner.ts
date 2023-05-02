export function toArray<T>(src: T | T[]): T[] {
  return Array.isArray(src) ? src : [src]
}

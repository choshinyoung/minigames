export function useWindowSizeValue(medium: any, small: any): any {
  return window.innerWidth / window.innerHeight > 1 ? medium : small;
}

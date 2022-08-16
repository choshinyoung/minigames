export function useWindowSizeValue(medium: any, small: any): any {
  return window.innerWidth / window.innerHeight > 1 ? medium : small;
}

export function shuffle(arr: any[]) {
  return arr.sort(() => Math.random() - 0.5);
}

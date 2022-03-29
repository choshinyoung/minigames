export enum windowSize {
  small,
  medium,
  large,
}

export function getWindowSize(size: windowSize) {
  return size === windowSize.small
    ? "400px"
    : size === windowSize.large
    ? "700px"
    : "550px";
}

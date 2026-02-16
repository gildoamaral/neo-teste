export function simularDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 600));
}
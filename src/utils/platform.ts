/**
 * src/utils/platform.ts
 * Tiny platform helper so shortcut hints read correctly per OS
 * (⌘ on Apple devices, Ctrl everywhere else).
 */

export function isMacPlatform(): boolean {
  if (typeof navigator === 'undefined') return false;
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const source = nav.userAgentData?.platform || navigator.platform || navigator.userAgent || '';
  return /mac|iphone|ipad|ipod/i.test(source);
}

/** Label for the primary modifier key: `⌘` on Apple devices, `Ctrl` elsewhere. */
export function modifierLabel(): string {
  return isMacPlatform() ? '⌘' : 'Ctrl';
}

/**
 * Toggles the site theme (dark <-> light) with a crisp CRT Terminal Scanline Wipe animation.
 */
let activeTransition: any = null;

export function skipThemeTransition(): void {
  if (activeTransition) {
    try {
      activeTransition.skipTransition();
    } catch {}
    activeTransition = null;
    document.documentElement.classList.remove('theme-transition');
  }
}

export function toggleThemeWithRipple(): void {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const newTheme = isLight ? 'dark' : 'light';

  skipThemeTransition();

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('startViewTransition' in document) || isReducedMotion) {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    return;
  }

  document.documentElement.classList.add('theme-transition');

  const transition = (document as any).startViewTransition(() => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  activeTransition = transition;

  transition.finished.finally(() => {
    if (activeTransition === transition) activeTransition = null;
    document.documentElement.classList.remove('theme-transition');
  });
}

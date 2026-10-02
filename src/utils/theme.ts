/**
 * Toggles the site theme (dark <-> light) with a crisp CRT Terminal Scanline Wipe animation
 * powered by the View Transitions API and CSS clip-path inset.
 */
export function toggleThemeWithRipple(_event?: MouseEvent | { clientX: number; clientY: number } | null): void {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const newTheme = isLight ? 'dark' : 'light';

  // Check if View Transitions API is supported and user has not requested reduced motion
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('startViewTransition' in document) || isReducedMotion) {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    return;
  }

  document.documentElement.classList.add('theme-transition');

  // Start the native view transition
  const transition = (document as any).startViewTransition(() => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            'inset(0 0 100% 0)',
            'inset(0 0 0 0)',
          ],
        },
        {
          duration: 450,
          easing: 'cubic-bezier(0.2, 0, 0, 1)',
          pseudoElement: '::view-transition-new(root)',
          fill: 'forwards',
        }
      );
    })
    .catch((err: unknown) => {
      console.debug('Theme view transition interrupted:', err);
    });

  transition.finished.finally(() => {
    document.documentElement.classList.remove('theme-transition');
  });
}

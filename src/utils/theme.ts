/**
 * Toggles the site theme (dark <-> light) with an expanding circular ripple animation
 * powered by the View Transitions API and CSS clip-path.
 */
export function toggleThemeWithRipple(event?: MouseEvent | { clientX: number; clientY: number } | null): void {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const newTheme = isLight ? 'dark' : 'light';

  // Check if View Transitions API is supported and user has not requested reduced motion
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('startViewTransition' in document) || isReducedMotion) {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    return;
  }

  // Calculate coordinates (x, y) for the center of the ripple
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;

  if (
    event &&
    typeof event.clientX === 'number' &&
    typeof event.clientY === 'number' &&
    (event.clientX !== 0 || event.clientY !== 0)
  ) {
    x = event.clientX;
    y = event.clientY;
  } else {
    // Find the currently visible theme toggle button to anchor the ripple origin
    const visibleBtn = Array.from(document.querySelectorAll<HTMLButtonElement>('.theme-toggle-btn'))
      .find((btn) => btn.offsetWidth > 0 && btn.offsetHeight > 0);

    if (visibleBtn) {
      const rect = visibleBtn.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
  }

  // Calculate the maximum radius required to cover the farthest corner of the viewport
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  // Set CSS variables on root BEFORE starting the view transition so the initial frame is clipped to 0px
  document.documentElement.style.setProperty('--ripple-x', `${Math.round(x)}px`);
  document.documentElement.style.setProperty('--ripple-y', `${Math.round(y)}px`);
  document.documentElement.style.setProperty('--ripple-r', `${Math.ceil(endRadius)}px`);
  document.documentElement.classList.add('theme-transition');

  // Start the native view transition
  const transition = (document as any).startViewTransition(() => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  transition.ready
    .then(() => {
      // WAAPI progressive enhancement to guarantee smooth clip-path animation across all browser engines
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${Math.round(x)}px ${Math.round(y)}px)`,
            `circle(${Math.ceil(endRadius)}px at ${Math.round(x)}px ${Math.round(y)}px)`,
          ],
        },
        {
          duration: 700,
          easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
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
    document.documentElement.style.removeProperty('--ripple-x');
    document.documentElement.style.removeProperty('--ripple-y');
    document.documentElement.style.removeProperty('--ripple-r');
  });
}

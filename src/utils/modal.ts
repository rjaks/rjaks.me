/**
 * src/utils/modal.ts
 * Unified modal manager for HTML <dialog> elements with smooth entrance and exit animations.
 */

export interface ModalAnimationOptions {
  onBeforeClose?: () => void;
  onAfterClose?: () => void;
}

export function registerModalAnimation(
  modal: HTMLDialogElement,
  options?: ModalAnimationOptions
) {
  if (!modal) return;
  if (modal.dataset.modalAnimAttached === 'true') return;
  modal.dataset.modalAnimAttached = 'true';
  modal.classList.add('modal-animated');

  const nativeClose = modal.close.bind(modal);
  const nativeShowModal = modal.showModal.bind(modal);
  let isClosing = false;
  let closeTimeout: number | undefined;

  function closeModal() {
    if (!modal.open || isClosing) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      options?.onBeforeClose?.();
      nativeClose();
      options?.onAfterClose?.();
      return;
    }

    isClosing = true;
    modal.classList.add('is-closing');
    options?.onBeforeClose?.();

    const finish = () => {
      window.clearTimeout(closeTimeout);
      modal.removeEventListener('animationend', handleAnimationEnd);
      modal.classList.remove('is-closing');
      isClosing = false;
      nativeClose();
      options?.onAfterClose?.();
    };

    const handleAnimationEnd = (e: AnimationEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        e.target === modal ||
        target?.classList?.contains('modal-panel') ||
        target?.classList?.contains('terminal-panel')
      ) {
        finish();
      }
    };

    modal.addEventListener('animationend', handleAnimationEnd);
    // Fallback timer (200ms) to ensure close completes even if animationend event doesn't fire
    closeTimeout = window.setTimeout(finish, 200);
  }

  // Intercept modal.close()
  modal.close = closeModal;

  // Intercept modal.showModal() to reset state cleanly if re-opened
  modal.showModal = () => {
    if (isClosing) {
      window.clearTimeout(closeTimeout);
      modal.classList.remove('is-closing');
      isClosing = false;
    }
    nativeShowModal();
  };

  // Intercept Escape key 'cancel' event so exit animation plays before closing
  modal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeModal();
  });
}

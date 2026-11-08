/**
 * Motion Coordinator (T-137, T-138, T-139)
 *
 * Enforces the global motion invariant:
 * At most 1 animated canvas runs in the viewport at any time.
 * If multiple canvases are visible, only the active one animates, while
 * the others render static frames until they claim focus.
 */

class MotionCoordinator {
  private activeId: string | null = null;
  private registered = new Map<string, { resume: () => void; pause: () => void }>();

  register(id: string, handlers: { resume: () => void; pause: () => void }): void {
    this.registered.set(id, handlers);
  }

  unregister(id: string): void {
    this.registered.delete(id);
    if (this.activeId === id) {
      this.activeId = null;
    }
  }

  requestActive(id: string): boolean {
    if (this.activeId === id) {
      return true;
    }
    if (this.activeId && this.activeId !== id) {
      // Pause previously active canvas
      const previous = this.registered.get(this.activeId);
      previous?.pause();
    }
    this.activeId = id;
    return true;
  }

  releaseActive(id: string): void {
    if (this.activeId === id) {
      this.activeId = null;
    }
  }

  isActive(id: string): boolean {
    return this.activeId === id;
  }
}

export const motionCoordinator = new MotionCoordinator();

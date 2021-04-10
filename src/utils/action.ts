export function createDrag(
  dom: HTMLElement,
  props?: {
    onStart?: () => void;
    onUpdate?: (delta: { x: number; y: number }) => void;
    onEnd?: () => void;
  }
) {
  let canDrag = false;
  let startX = 0;
  let startY = 0;

  function normalizeTouch(e: MouseEvent | TouchEvent) {
    if (e instanceof TouchEvent) {
      return e.touches[0];
    }
    return {
      clientX: e.clientX,
      clientY: e.clientY,
    };
  }

  function handleDragStart(e: MouseEvent | TouchEvent) {
    canDrag = true;
    props?.onStart && props.onStart();
    const touch = normalizeTouch(e);
    startX = touch.clientX;
    startY = touch.clientY;
  }

  function handleDragMove(e: MouseEvent | TouchEvent) {
    if (!canDrag) return;

    const touch = normalizeTouch(e);

    const currentX = touch.clientX;
    const currentY = touch.clientY;
    const delta = {
      x: currentX - startX,
      y: currentY - startY,
    };
    startX = currentX;
    startY = currentY;
    props?.onUpdate && props.onUpdate(delta);
  }

  function handleDragUp(e: MouseEvent | TouchEvent) {
    canDrag = false;
    props?.onEnd && props.onEnd();
  }

  dom.addEventListener('mousedown', handleDragStart);
  document.addEventListener('mousemove', handleDragMove);
  document.addEventListener('mouseup', handleDragUp);

  dom.addEventListener('touchstart', handleDragStart);
  document.addEventListener('touchmove', handleDragMove);
  document.addEventListener('touchend', handleDragUp);

  return function destroy() {
    dom.removeEventListener('mousedown', handleDragStart);
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragUp);

    dom.removeEventListener('touchstart', handleDragStart);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragUp);
  };
}

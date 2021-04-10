import { useRef } from 'react';

function normalizeTouch(e: DragEvent) {
  return {
    clientX: e.clientX,
    clientY: e.clientY,
  };
}
function useDrag({
  onStart,
  onEnd,
}: {
  onStart?: () => void;
  onEnd?: ({ left, top }: { left: number; top: number }) => void;
}) {
  const record = useRef({ startX: 0, startY: 0 });

  function handleDragStart(e: DragEvent) {
    const touch = normalizeTouch(e);
    record.current.startX = touch.clientX;
    record.current.startY = touch.clientY;
    onStart && onStart();
  }

  function handleDragEnd(e: DragEvent) {
    console.log('end');
    const { startX, startY } = record.current;
    const touch = normalizeTouch(e);
    console.log(touch);
    onEnd &&
      onEnd({ left: touch.clientX - startX, top: touch.clientY - startY });
    record.current.startX = touch.clientX;
    record.current.startY = touch.clientY;
  }

  return { handleDragStart, handleDragEnd };
}

export default useDrag;

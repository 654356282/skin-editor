import React, {
  FC,
  useState,
  MouseEvent as RMouseEvent,
  useRef,
  useEffect,
} from 'react';
import styles from './Square.module.scss';
import { applyClasses } from '@/utils';
import { px } from '@/utils/view';
import { v4 } from 'uuid';

export interface SquareProps {
  canvasWidth: number;
  canvasHeight: number;
}

const Square: FC<SquareProps> = props => {
  const [squareProps, setSquareProps] = useState({
    size: {
      width: 100,
      height: 100,
    },
    offset: {
      left: 0,
      top: 0,
    },
    id: v4(),
  });
  const [isChoose, setIsChoose] = useState(false);

  const canMove = useRef(false);

  const centerPinter = useRef({
    left: 0,
    top: 0,
    startX: 0,
    startY: 0,
  });

  function handleMouseDown(event: RMouseEvent<HTMLDivElement>) {
    canMove.current = true;
    centerPinter.current.left = event.nativeEvent.offsetX;
    centerPinter.current.top = event.nativeEvent.offsetY;
    centerPinter.current.startX = event.clientX;
    centerPinter.current.startY = event.clientY;
  }

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!canMove.current) return;
      console.log(centerPinter.current.startX, e.clientX);
      const offsetX = e.clientX - centerPinter.current.startX;
      const offsetY = e.clientY - centerPinter.current.startY;
      setSquareProps(state => {
        state.offset.left = offsetX;
        state.offset.top = offsetY;
        return { ...state };
      });
    }
    function handleMouseUp(e: MouseEvent) {
      canMove.current = false;
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  function handleMouseUp(event: RMouseEvent<HTMLDivElement>) {}

  return (
    <div
      className={applyClasses('draggable')}
      style={{
        width: px(squareProps.size.width),
        height: px(squareProps.size.height),
        backgroundColor: 'red',
        left: px(squareProps.offset.left),
        top: px(squareProps.offset.top),
      }}
      onClick={() => setIsChoose(true)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className={applyClasses(styles.line, styles.tLine)} />
      <div className={applyClasses(styles.line, styles.bLine)} />
      <div className={applyClasses(styles.line, styles.lLine)} />
      <div className={applyClasses(styles.line, styles.rLine)} />
      <div className={applyClasses(styles.ltDot, styles.dot)} />
      <div className={applyClasses(styles.rtDot, styles.dot)} />
      <div className={applyClasses(styles.lbDot, styles.dot)} />
      <div className={applyClasses(styles.rbDot, styles.dot)} />
    </div>
  );
};

export default Square;

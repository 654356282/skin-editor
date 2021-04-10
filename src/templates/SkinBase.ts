import { v4 } from 'uuid';
import DraggableFragment from '@/templates/DraggableFragment';

export interface ISkinBase {
  dom: HTMLElement;
  parent?: HTMLElement;
  parentKey?: string;
  id: string;
  width: number;
  height: number;
  left: number;
  top: number;
  bottom?: number;
  right?: number;
  drag: (e: MouseEvent) => void;
  scale: () => void;
  toJson: () => string;
}

export default class SkinBase implements ISkinBase {
  private _isOnChoose: boolean;

  dom: HTMLElement;
  private _recorder?: {
    startX: number;
    startY: number;
    draggable: boolean;
  };

  drag = (e: MouseEvent) => {
    if (!this._isOnChoose) {
      return;
    }
  };
  bottom?: number;
  right?: number;
  height: number;
  left: number;
  parent?: HTMLElement;
  id: string;

  scale(): void {}

  toJson(): string {
    return JSON.stringify({
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left,
      right: this.right,
      bottom: this.bottom,
      id: this.id,
    });
  }

  handleMouseDown = (e: MouseEvent) => {
    console.log('down');
    if (!this._isOnChoose) {
      this._isOnChoose = true;
      this.dom.style.cursor = 'move';
      const f = DraggableFragment.getFragment();
      this.dom.appendChild(f);
      return;
    }
    this._recorder = {
      startX: e.offsetX,
      startY: e.offsetY,
      draggable: true,
    };
  };

  handleMouseMove = (e: MouseEvent) => {
    if (!this._isOnChoose || !this._recorder?.draggable) {
      return;
    }
    const { startX, startY } = this._recorder!;
    const diffX = e.offsetX - startX;
    const diffY = e.offsetY - startY;
    this.dom.style.left = this.left + diffX + 'px';
    this.dom.style.top = this.top + diffY + 'px';
  };

  handleMouseup = (e: MouseEvent) => {
    if (!this._isOnChoose || !this._recorder?.draggable) {
      return;
    }
    this.left = this.dom.offsetLeft;
    this.top = this.dom.offsetTop;
    this._recorder = {
      draggable: false,
      startX: 0,
      startY: 0,
    };
  };

  render() {
    this.dom.style.position = 'absolute';
    this.dom.style.left = this.left + 'px';
    this.dom.style.top = this.top + 'px';
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
  }

  addEvents() {
    this.dom.addEventListener('mousedown', this.handleMouseDown);
    this.dom.addEventListener('mousemove', this.handleMouseMove);
    this.dom.addEventListener('mousedown', this.handleMouseup);
  }

  top: number;
  width: number;
  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.id = v4();
    this.top = 0;
    this.left = 0;
    this.width = 100;
    this.height = 100;
    this._isOnChoose = false;
    this.render();
    this.addEvents();
  }
  reset() {
    this.top = 0;
    this.left = 0;
    this.width = 100;
    this.height = 100;
    this._isOnChoose = false;
    this.render();
  }
}

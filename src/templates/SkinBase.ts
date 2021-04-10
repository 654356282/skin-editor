import { v4 } from 'uuid';

export interface ISkinBase {
  dom: HTMLElement;
  parent?: HTMLElement;
  parentKey?: string;
  key: string;
  width: string;
  height: string;
  position: 'unset' | 'fixed' | 'absolute' | 'relative';
  left: string;
  top: string;
  bottom?: string;
  right?: string;
  drag: () => void;
  scale: () => void;
  choose: () => void;
  toJson: () => string;
}

class DraggableFragment {
  static _ltDot: HTMLDivElement;
  static _rtDot: HTMLDivElement;
  static _lbDot: HTMLDivElement;
  static _rbDot: HTMLDivElement;
  static _tLine: HTMLDivElement;
  static _bLine: HTMLDivElement;
  static _lLine: HTMLDivElement;
  static _rLine: HTMLDivElement;
  static _fragment: DocumentFragment;
  private constructor() {}
  static getFragment() {
    if (this._fragment) {
      return this._fragment;
    }
    this._fragment = document.createDocumentFragment();
    this._create4Dots();
    this._create4Lines();
    this._appendAllDom();
    return this._fragment;
  }
  static _createDot(pos: {
    left?: string;
    top?: string;
    bottom?: string;
    right?: string;
  }) {
    const dom = document.createElement('div');
    this._initPosAndSize({ dom, ...pos, width: '10px', height: '10px' });
    return dom;
  }
  static _initPosAndSize({
    dom,
    width,
    height,
    left,
    right,
    top,
    bottom,
  }: {
    dom: HTMLElement;
    width: string;
    height: string;
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  }) {
    dom.style.position = 'absolute';
    dom.style.width = width;
    dom.style.height = height;
    dom.style.left = left || 'auto';
    dom.style.right = right || 'auto';
    dom.style.top = top || 'auto';
    dom.style.bottom = bottom || 'auto';
  }
  static _create4Dots() {
    this._ltDot = this._createDot({ left: '0px', top: '0px' });
    this._rtDot = this._createDot({ right: '0px', top: '0px' });
    this._lbDot = this._createDot({ left: '0px', bottom: '0px' });
    this._rbDot = this._createDot({ right: '0px', bottom: '0px' });
  }
  static _createLine(p: {
    left?: string;
    right?: string;
    bottom?: string;
    top?: string;
    width: string;
    height: string;
  }) {
    const line = document.createElement('div');
    this._initPosAndSize({ ...p, dom: line });
    line.style.backgroundColor = 'purple';
    return line;
  }
  static _create4Lines() {
    this._tLine = this._createLine({
      left: '0px',
      top: '0px',
      width: '100%',
      height: '2px',
    });
    this._bLine = this._createLine({
      left: '0px',
      bottom: '0px',
      width: '100%',
      height: '2px',
    });
    this._lLine = this._createLine({
      width: '2px',
      height: '100%',
      left: '0px',
      top: '0px',
    });
    this._rLine = this._createLine({
      width: '2px',
      height: '100%',
      right: '0px',
      top: '0px',
    });
  }
  static _appendAllDom() {
    this._fragment.append(
      this._lLine,
      this._rLine,
      this._tLine,
      this._bLine,
      this._ltDot,
      this._rtDot,
      this._lbDot,
      this._rbDot
    );
  }
}

export default class SkinBase implements ISkinBase {
  private _isOnChoose: boolean;
  choose(): void {
    if (this.position === 'unset') {
      this.dom.style.position = 'relative';
      this.position = 'relative';
    }
    this._isOnChoose = true;
    const f = DraggableFragment.getFragment();
    this.dom.appendChild(f);
  }

  dom: HTMLElement;

  drag(): void {}

  height: string;
  key: string;
  left: string;
  parent?: HTMLElement;
  position: 'unset' | 'fixed' | 'absolute' | 'relative';

  scale(): void {}

  toJson(): string {
    return '';
  }

  addEvents() {
    const _this = this;
    this.dom.addEventListener('click', function () {
      if (!_this._isOnChoose) {
        _this.choose();
      }
    });
  }

  top: string;
  width: string;
  constructor(dom: HTMLElement) {
    this.dom = dom;
    this.key = v4();
    this.top = '0px';
    this.left = '0px';
    this.width = '100px';
    this.height = '100px';
    this.position = 'unset';
    this._isOnChoose = false;
    this.dom.style.width = this.width;
    this.dom.style.height = this.height;
    this.addEvents();
  }
  reset() {
    this.key = v4();
    this.top = '0px';
    this.left = '0px';
    this.width = '100px';
    this.height = '100px';
    this.position = 'unset';
    this._isOnChoose = false;
    this.dom.style.width = this.width;
    this.dom.style.height = this.height;
  }
}

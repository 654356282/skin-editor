export default class DraggableFragment {
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
    dom.style.backgroundColor = 'purple';
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
    this._ltDot.style.cursor = 'nwse-resize';
    this._rtDot = this._createDot({ right: '0px', top: '0px' });
    this._rtDot.style.cursor = 'nesw-resize';
    this._lbDot = this._createDot({ left: '0px', bottom: '0px' });
    this._lbDot.style.cursor = 'nesw-resize';
    this._rbDot = this._createDot({ right: '0px', bottom: '0px' });
    this._rbDot.style.cursor = 'nwse-resize';
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

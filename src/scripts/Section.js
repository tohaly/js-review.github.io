export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  
  renderCards() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
  
  addItem(item) {
    this._container.appendChild(item);
  }
}
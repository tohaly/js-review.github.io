const ESC_KEYCODE = 27;

export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  
  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keyup', this._handleEscClose);
  }
  
  close() {
    console.log(this._popup);
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }
  
  _handleEscClose(event) {
    event.preventDefault();
    if(event.which === ESC_KEYCODE) {
      console.log('esc');
      this.close();
    }
  };
  
  setEventListeners() {
    this._popup.addEventListener('click', event => {
      if(event.target.classList.contains('popup__close')) {
        this.close();
      }
    });
    this._popup.addEventListener('mouseup', (event) => {
      if(event.target.classList.contains('popup')){
        this.close();
      }
    })
  }
}
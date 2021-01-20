import { Popup } from './Popup';

export class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
  }
  
  _getInputValues() {
    const inputs = this._form.querySelectorAll('.popup__input');
    const data = {};
    
    inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    
    return data;
  }
  
  close() {
    this._form.reset();
    super.close();
  }
  
  setEventListeners() {
    const button = this._form.querySelector('.popup__button');
    
    button.addEventListener('click', (event) => {
      event.preventDefault();
      this._callback(this._getInputValues());
      this.close();
      
      button.disabled = true;
    });
    
    super.setEventListeners();
  }
}
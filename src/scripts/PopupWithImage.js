import { Popup } from './Popup';

export class PopupWithImage extends Popup {
  open({ link, name }) {
    const img = this._popup.querySelector('.popup__image');
    const description = this._popup.querySelector('.popup__caption');
    
    img.src = link;
    img.alt = name;
    description.textContent = name;
    
    super.open();
  }
}
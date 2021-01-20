import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { Section } from './Section';
import { PopupWithForm } from './PopupWithForm';
import { UserInfo } from './UserInfo';
import { PopupWithImage } from './PopupWithImage';

import '../pages/index.css';


// Константы

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const selectors = {
  cardTemplate: '.card-template',
  cardList: '.places__list',
  imagePopup: '.popup_type_image',
  addPopup: '.popup_type_new-card',
  editPopup: '.popup_type_edit',
  profileName: '.profile__title',
  profileInfo: '.profile__description'
};
const defaultFormConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editFormModalWindow = document.querySelector('.popup_type_edit');
const cardFormModalWindow = document.querySelector('.popup_type_new-card');
const openEditFormButton = document.querySelector('.profile__edit-button');
const openCardFormButton = document.querySelector('.profile__add-button');
const titleInputValue = editFormModalWindow.querySelector('.popup__input_type_name');
const descriptionInputValue = editFormModalWindow.querySelector('.popup__input_type_description');


const handleCardClick = (data) => {
  imagePopup.open(data);
};

const userInfo = new UserInfo({
  nameSelector: selectors.profileName,
  infoSelector: selectors.profileInfo
});
const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, selectors.cardTemplate, handleCardClick);
    section.addItem(card.getView());
  }
}, selectors.cardList);

// Popups
const addPopup = new PopupWithForm(selectors.addPopup, (data) => {
  const card = new Card(data, selectors.cardTemplate, handleCardClick);
  section.addItem(card.getView());
});
const editPopup = new PopupWithForm(selectors.editPopup, (data) => {
  userInfo.setUserInfo(data);
});
const imagePopup = new PopupWithImage(selectors.imagePopup);

openCardFormButton.addEventListener('click', () => {
  addPopup.open();
});
openEditFormButton.addEventListener('click', () => {
  const { name, info } = userInfo.getUserInfo();
  titleInputValue.value = name;
  descriptionInputValue.value = info;
  editPopup.open();
});

const editFormValidator = new FormValidator(defaultFormConfig, editFormModalWindow);
const cardFormValidator = new FormValidator(defaultFormConfig, cardFormModalWindow);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
section.renderCards();
addPopup.setEventListeners();
editPopup.setEventListeners();
imagePopup.setEventListeners();
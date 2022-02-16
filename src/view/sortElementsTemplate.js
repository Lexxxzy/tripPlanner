/* eslint-disable no-unused-vars */

import { createElement } from '../utils.js';


const createSortTemplate = (inputValue,labelValue) => (
  `<div class="trip-sort__item  trip-sort__item--${labelValue.toLowerCase()}">
    <input id="${inputValue}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${inputValue}" >
    <label class="trip-sort__btn" for="${inputValue}">${labelValue}</label>
    </div>
  `
);

export default class SortElements {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    let ret = '';
    const sortItems = ['Day', 'Event', 'Time', 'Price', 'Offers'];
    for(const item of sortItems)
    {
      ret += createSortTemplate(`sort-${item.toLowerCase()}`,item);
    }
    return ret;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


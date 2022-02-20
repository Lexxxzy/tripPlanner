import AbstractView from './abstract.js';

const createSortTemplate = (inputValue,labelValue) => (
  `<div class="trip-sort__item  trip-sort__item--${labelValue.toLowerCase()}">
    <input id="${inputValue}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${inputValue}" >
    <label class="trip-sort__btn" for="${inputValue}">${labelValue}</label>
    </div>
  `
);

export default class SortElements extends AbstractView{
  getTemplate() {
    let ret = '';
    const sortItems = ['Day', 'Event', 'Time', 'Price', 'Offers'];
    for(const item of sortItems)
    {
      ret += createSortTemplate(`sort-${item.toLowerCase()}`,item);
    }
    return ret;
  }
}



import { createElement } from '../utils';
import SortElementsView from './sortElementsTemplate';


const createSortMenuTemplate = (sortElements) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${sortElements}
</form>`;

export default class Sort{
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSortMenuTemplate(new SortElementsView().getTemplate());
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


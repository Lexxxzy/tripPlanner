import AbstractView from './abstract.js';

import SortElementsView from './sortElementsTemplate';

const createSortMenuTemplate = (sortElements) => `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
${sortElements}
</form>`;

export default class Sort extends AbstractView{
  getTemplate() {
    return createSortMenuTemplate(new SortElementsView().getTemplate());
  }
}


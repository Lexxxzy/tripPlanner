/* eslint-disable no-console */
import { createOffer } from './eventOffer';
import { createElement } from '../utils';
const createTripContent = (point) =>{

  const {tripType,destination,price,dateTo,fromTime,toTime,isFavorite,offers,timeInPoint,dateFromFormatted} = point;
  const favClassName = isFavorite ? 'event__favorite-btn--active' : 'event__favorite-btn--disabled';
  return (`
<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dateFromFormatted}">${dateFromFormatted}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${tripType.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${tripType} ${destination}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFromFormatted}">${fromTime}</time>
        &mdash;
        <time class="event__end-time" datetime="${dateTo}">${toTime}</time>
      </p>
      <p class="event__duration">${timeInPoint}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${createOffer(offers)}
    </ul>
    <button class="event__favorite-btn ${favClassName}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button" >
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`);
};

export default class TripContent{
  constructor() {
    this._element = null;
  }

  getElement(point) {
    if (!this._element) {
      this._element = createElement(createTripContent(point));
      console.log(createElement(createTripContent(point)));
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


//this.parentElement.parentElement.remove()

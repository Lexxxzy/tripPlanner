import { createElement } from '../utils';
import dayjs from 'dayjs';


const allCities = (points) =>
{
  const cities = new Set;
  const dates = new Set;
  let priceAll = 0;
  for (const point of points){
    cities.add(point.destination);
    dates.add(new Date(point.dateFrom));
    priceAll+=point.price + point.offers.reduce((sum, item)=> sum = sum+item.price,0);
  }
  const maxDate=dayjs(new Date(Math.max(...dates))).format('DD MMM');
  const minDate=dayjs(new Date(Math.min(...dates))).format('DD MMM');

  return {
    citiesArray: Array.from(cities),
    max: maxDate,
    min: minDate,
    price: priceAll,
  };
};

const createTripInfo = (cities) => {
  const { citiesArray,max,min,price } = cities;
  let res = '';
  citiesArray.length <= 3 ?
    res = citiesArray.join(' — ').toString() :
    res = `${citiesArray[1]  } — . . . — ${ citiesArray[citiesArray.length-1]}`;

  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${res}</h1>

      <p class="trip-info__dates">${min}&nbsp;&mdash;&nbsp;${max}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>
  </section>`
  );
};

export default class TripInfo{
  constructor() {
    this._element = null;
  }

  getTemplate(points) {
    return createTripInfo(allCities(points));
  }

  getElement(points) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(points));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


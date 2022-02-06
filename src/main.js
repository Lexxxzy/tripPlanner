import { createTripInfo } from './view/tripInfo';
import { createMenuInfo } from './view/menu';
import { createTripFilters } from './view/filters';
import { createTripSort } from './view/sort';
import { createTripContent } from './view/content';
import { createNewPoint } from './view/addNewPoint';
import { generatePoint } from './mock/point';
import dayjs from 'dayjs';


const POINTS_COUNT = 4;
const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const allCities = () =>
{
  const cities = new Set;
  const dates = new Set;
  for (const point of points){
    cities.add(point.destination);
    dates.add(new Date(point.dateFrom));
  }
  const maxDate=dayjs(new Date(Math.max(...dates))).format('DD MMM');
  const minDate=dayjs(new Date(Math.min(...dates))).format('DD MMM');

  return {
    citiesArray: Array.from(cities),
    max: maxDate,
    min: minDate,
  };
};

export const render = (container, template, place) =>
{
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('header');
const siteMainElement = document.querySelector('main');

const siteTripMain = siteHeaderElement.querySelector('.trip-main');
const siteTripNavigation = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripFilters = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripSort = siteMainElement.querySelector('.trip-events');
//const siteTripContent = siteMainElement.querySelector('.trip-events');

render(siteTripMain, createTripInfo(allCities()), 'afterbegin');
render(siteTripNavigation, createMenuInfo(), 'beforeend');
render(siteTripFilters, createTripFilters(), 'beforeend');
render(siteTripSort, createTripSort(), 'afterbegin');

//Добаление формы для добавдения новой точки маршрута
export const siteNewPoint = document.querySelector('.trip-events__list');

for (let i = 0; i < POINTS_COUNT; i++) {
  render(siteNewPoint, createTripContent(points[i]), 'beforeend');
}

//по клику на кнопку +NEW EVENT показывать форму добавления,
//по клику на форме добавления на cancel удалять элемент из разметки

const buttonAdd = document.querySelector('.trip-main__event-add-btn');
const buttonEdit = document.querySelector('.event__rollup-btn');

const cancelForm = () => {
  buttonAdd.disabled = true;
  const cancelAddingEvent = document.querySelector('.event__reset-btn');


  cancelAddingEvent.onclick = () => {
    buttonAdd.disabled = false;
    siteNewPoint.removeChild(siteNewPoint.firstChild);
  };

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape')
    {
      if(buttonAdd.disabled === true)
      {
        siteNewPoint.removeChild(siteNewPoint.firstChild);
      }
      buttonAdd.disabled = false;
    }
  });
};

buttonAdd.onclick = () =>
{
  render(siteNewPoint, createNewPoint(), 'afterbegin');
  cancelForm();
};

buttonEdit.onclick = () =>
{
  render(siteNewPoint,createNewPoint(points[0]),'afterbegin');
  cancelForm();
};

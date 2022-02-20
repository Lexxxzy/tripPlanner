import TripInfoView from './view/tripInfo';
import SiteMenuView from './view/menu.js';
import TripFiltersView from './view/filters';
import SortView from './view/sort';
import TripContentView from './view/content';
import AddEditView from './view/addNewPoint';
import { generatePoint } from './mock/point';
import {  RenderPosition, render } from './utils';


const POINTS_COUNT = 5;
const points = new Array(POINTS_COUNT).fill().map(generatePoint);

const siteHeaderElement = document.querySelector('header');
const siteMainElement = document.querySelector('main');

const siteTripMain = siteHeaderElement.querySelector('.trip-main');
const siteTripNavigation = siteHeaderElement.querySelector('.trip-controls__navigation');
const siteTripFilters = siteHeaderElement.querySelector('.trip-controls__filters');
const siteTripSort = siteMainElement.querySelector('.trip-events');


render(siteTripMain, new TripInfoView(points).getElement(),  RenderPosition.AFTERBEGIN);
render(siteTripNavigation, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteTripFilters, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);
render(siteTripSort, new SortView().getElement(), RenderPosition.AFTERBEGIN);

//Добаление формы для добавдения новой точки маршрута
const siteNewPoint = document.querySelector('.trip-events__list');


//по клику на кнопку +NEW EVENT показывать форму добавления,
//по клику на форме добавления на cancel удалять элемент из разметки

const buttonAdd = document.querySelector('.trip-main__event-add-btn');

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
  render(siteNewPoint, new AddEditView(null).getElement(), 'afterbegin');
  cancelForm();
};

const renderPoint = (point) => {
  const pointComponent = new TripContentView(point);
  const pointEditComponent = new AddEditView(point);

  const replaceCardToForm = () => {
    buttonAdd.disabled = true;
    siteNewPoint.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    buttonAdd.disabled = false;
    siteNewPoint.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  };

  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceCardToForm();
  });


  pointEditComponent.getElement().querySelector('form').addEventListener('reset', () => {
    replaceFormToCard();
  });

  pointEditComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(siteNewPoint, pointComponent.getElement(), RenderPosition.BEFOREEND);

};

for (let i=0;i<POINTS_COUNT;i++){
  renderPoint(points[i]);
}

export const createTripInfo = (cities) => {
  const { citiesArray,max,min } = cities;
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
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>
  </section>`
  );
};


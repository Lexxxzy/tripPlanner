import dayjs from 'dayjs';
/* eslint-disable no-console */
//Функция для генерации рандомного числа
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const typesOfTrip = [ 'Taxi' , 'Bus' , 'Train' , 'Ship' , 'Drive', 'Flight'
  , 'Check-in' , 'Sightseeing' , 'Restaurant'];

const cities = [ 'Amsterdam' , 'Chamonix' , 'Geneva' , 'Dublin' , 'Copenhagen', 'Edinburgh'
  , 'Budapest' , 'Venice' , 'Tallinn'];

const offerNames = ['Order Uber','Rent a car', 'Add breakfast', 'Lunch in city', 'Switch to comfort'];

export const generateDescription = () =>{
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Cras aliquet varius magna, non porta ligula feugiat eget.Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
  const descMas = description.split('. ').map((i)=>i.replace(/\.*$/,'.'));
  return descMas.slice(getRandomInteger(0),getRandomInteger(1,descMas.length)).join(' ').toString();
};


export const generateOffer = () => ({
  name: offerNames[getRandomInteger(1,offerNames.length-1)],
  price: getRandomInteger(10,160),
});

export const generateOffers = () => new Array(getRandomInteger(0,5)).fill().map(generateOffer);


const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day')
    .add(getRandomInteger(0, 24), 'hour')
    .add(getRandomInteger(0, 60), 'minute');
};

/*Три функции для преобразования из милисекунд в формат 00D 00H 00M*/
function parseDuration(duration) {
  let remain = duration;

  const days = Math.floor(remain / (1000 * 60 * 60 * 24));
  remain = remain % (1000 * 60 * 60 * 24);

  const hours = Math.floor(remain / (1000 * 60 * 60));
  remain = remain % (1000 * 60 * 60);

  const minutes = Math.floor(remain / (1000 * 60));
  remain = remain % (1000 * 60);


  return {
    days,
    hours,
    minutes,
  };
}
function formatTime(o) {
  const parts = [];
  if (o.days) {
    const ret = `${o.days  }D`;
    parts.push(ret);
  }
  if (o.hours) {
    const ret = `${o.hours  }H`;
    parts.push(ret);
  }
  if (o.minutes) {
    const ret = `${o.minutes  }M`;
    parts.push(ret);
  }
  if (parts.length === 0) {
    return 'Instantly';
  } else {
    return parts.join(' ');
  }
}
const timeConversion = (duration) => {
  const time = parseDuration(duration);
  return formatTime(time);
};

export const generatePoint = () => {
  const dateOfTrip = generateDate();
  dateOfTrip.add(getRandomInteger(0, 24), 'hour').add(getRandomInteger(0, 60), 'minute');
  const city = cities[getRandomInteger(0, cities.length-1)];
  const dateToEnd  = dateOfTrip.add(getRandomInteger(0, 1),'day')
    .add(getRandomInteger(0, 10), 'hour')
    .add(getRandomInteger(0, 60), 'minute');

  return {
    tripType: typesOfTrip[getRandomInteger(0, typesOfTrip.length-1)],
    destination: city,
    offers: generateOffers(),
    description: generateDescription(),
    price: getRandomInteger(50, 500),

    dateFrom: dateOfTrip,
    dateTo: dateToEnd,
    dateFromFormatted: dateOfTrip.format('DD MMM'),
    dateFromForm: dateOfTrip.format('DD/MM/YY HH:mm'),
    dateToForm: dateToEnd.format('DD/MM/YY HH:mm'),
    fromTime: dateOfTrip.format('HH:mm'),
    toTime: dateToEnd
      .format('HH:mm'),
    timeInPoint: timeConversion(Math.abs(dateOfTrip.toDate() - dateToEnd.toDate())),
    isFavorite: Boolean(getRandomInteger(0,1)),
  };
};


export const createOffer = (offers) => {
  let ret = '';
  for(const offer of offers)
  {
    ret+=`<li class="event__offer">
      <span class="event__offer-title">${offer.name}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`;
  }
  return ret;
};

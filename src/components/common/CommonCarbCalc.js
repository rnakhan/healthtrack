import { BREAKFAST, LUNCH, DINNER, OTHER } from './Constants';

const _numerify = (value) => {
  if (value === '') return 0;
  else return value;
}

const updateCarbs = (e, type, element) => {
  let val = '';
  if (e.target.value) {
    val = parseInt(e.target.value, 10); // second arg is radix
  }
  switch (type) {
    case BREAKFAST:
      element = { ...element, breakfastCarbs: val };
      break;
    case LUNCH:
      element = { ...element, lunchCarbs: val };
      break;
    case DINNER:
      element = { ...element, dinnerCarbs: val };
      break;
    case OTHER:
      element = { ...element, otherCarbs: val };
      break;
    default: 
      // no op
  }
  element.totalCarbs =
    _numerify(element.breakfastCarbs) +
    _numerify(element.lunchCarbs) +
    _numerify(element.dinnerCarbs) +
    _numerify(element.otherCarbs);
  return element;
}

export { updateCarbs };
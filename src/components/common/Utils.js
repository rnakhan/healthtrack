const formatDate = (date = new Date()) => {
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return monthIndex + 1 + '/' + day + '/' + year;
}

const hoursToGoString = (date = new Date()) => {
  var currentHour = date.getHours();
  var hoursLeft = 24 - currentHour;
  if (hoursLeft > 1) {
    return `${hoursLeft} hrs left in the day`;
  } else if (hoursLeft === 1) {
    return 'Only 1 hr left in the day';
  } else {
    return 'Few minutes left in the day';
  }
}

// For a given date returns the date as of 0000 hours that day
// without hrs/min/secs
const getWholeDate = (date = new Date()) => {
  date.setHours(0, 0, 0, 0);
  //date.setSeconds(0, 0);  // use it to test at minute boundary
  return JSON.parse(JSON.stringify(date));
}

const firstCharOfDayWithColor = (dateStr) => {
  var day = (new Date(dateStr)).getDay();
  // 0 is Sunday, 6 is Saturday
  switch(day) {
    case 0: 
      return { day: 'S', color: 'red'};
    case 1:
      return { day: 'M', color: 'blue'};
    case 2: 
      return { day: 'T', color: 'green'};
    case 3:
      return { day: 'W', color: 'brown'};
    case 4:
      return { day: 'T', color: 'brown'};
    case 5: 
      return { day: 'F', color: 'magenta'};
    case 6:
      return { day: 'S', color: 'orange'};
    default:
      return {day: 'O', color: 'black'};
  }
}

export { formatDate, hoursToGoString, getWholeDate, firstCharOfDayWithColor };
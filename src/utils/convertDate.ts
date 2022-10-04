const convertDate: (date: Date) => string = (date: Date) => {
  const time = Date.now() - date.getTime();
  if (time < 60000) {
    return 'Just now';
  } else if (time < 3600000) {
    return `${Math.floor(time / 60000)} ${
      Math.floor(time / 60000) === 1 ? 'minute' : 'minutes'
    } ago`;
  } else if (time < 86400000) {
    return `${Math.floor(time / 3600000)} ${
      Math.floor(time / 3600000) === 1 ? 'hour' : 'hours'
    } ago`;
  } else if (time < 1008000000) {
    return `${Math.floor(time / 86400000)} ${
      Math.floor(time / 86400000) === 1 ? 'day' : 'days'
    } ago`;
  } else {
    return `${date.toLocaleDateString()}`;
  }
};

export default convertDate;

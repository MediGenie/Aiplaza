export const createFormData = (inputElement) => {
  const formData = new FormData();
  for (const item of Object.keys(inputElement)) {
    if (inputElement[item] instanceof File) {
      formData.append(item, inputElement[item]);
    } else {
      typeof inputElement[item] !== 'string'
        ? formData.append(item, JSON.stringify(inputElement[item]))
        : formData.append(item, inputElement[item]);
    }
  }
  return formData;
};

export const checkIsEmail = (email) => {
  // const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (regex.test(String(email).toLowerCase())) {
    return true;
  } else return false;
};

export const changeDateFormat = (date) => {
  // console.log("date", date);
  const year = date.getFullYear();
  let month = '' + (date.getMonth() + 1);
  if (month.length === 1) month = '0' + month;
  let day = '' + date.getDate();
  if (day.length === 1) day = '0' + day;
  const dateFormat = [year, month, day].join('.');
  return dateFormat;
};

export const getNumberWithCommas = (num) => {
  if (num === 0) return 0;
  else return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

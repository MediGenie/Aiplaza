import moment from 'moment-timezone';

export function dateFormat(date, format = 'YYYY.MM.DD') {
  return moment.tz(date, 'Asia/Seoul').format(format);
}

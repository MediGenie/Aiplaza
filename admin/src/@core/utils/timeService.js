import moment from 'moment-timezone';

export const checkUserDurationExpired = ({ duration, startDate }) => {
  if (duration === 0 || startDate === null) {
    return true;
  }
  const today = moment().tz('Asia/Seoul');
  const target = moment(startDate)
    .tz('Asia/Seoul')
    .add(duration, 'milliseconds');

  if (today.isAfter(target)) {
    return true;
  } else return false;
};

export const getTodayFromDateToString = () => {
  return moment().tz('Asia/Seoul').format('YYYY-MM-DD');
};

import moment from 'moment-timezone';

export default function getKST(date, formatString) {
  const kst = moment(date).tz('Asia/Seoul');
  if (formatString) {
    return kst.format(formatString);
  }
  return kst;
}

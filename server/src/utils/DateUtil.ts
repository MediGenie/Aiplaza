export const formCreatedDate = (date: Date, connect = '.') => {
  if (!date) return;
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return `${yy}${connect}${mm.toString().padStart(2, '0')}${connect}${dd
    .toString()
    .padStart(2, '0')}`;
};

export const formCreatedDateToSeconds = (date: Date) => {
  if (!date) return;
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mmm = date.getMinutes();
  const ss = date.getSeconds();
  return `${yy}.${mm.toString().padStart(2, '0')}.${dd
    .toString()
    .padStart(2, '0')} ${hh.toString().padStart(2, '0')}:${mmm
    .toString()
    .padStart(2, '0')}:${ss.toString().padStart(2, '0')}}`;
};

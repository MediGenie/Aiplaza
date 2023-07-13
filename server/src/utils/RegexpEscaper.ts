export const RegexpEscaper = (str: string) => {
  if (typeof str !== 'string') return;
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

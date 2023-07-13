export const mask = {
  name: (_name: string) => {
    const engRegExp = /^[a-zA-Z\s]+$/;
    const isEng = engRegExp.test(_name);
    if (isEng) {
      const digests = _name.split(' ');
      for (let i = 1; i < digests.length; i++) {
        if (i === 1) {
          digests[i] =
            digests[i].charAt(0) + ''.padStart(digests[i].length - 1, '*');
        } else {
          digests[i] = ''.padStart(digests[i].length, '*');
        }
      }
      return digests.join(' ');
    } else {
      const start_str = _name.charAt(0);
      const last_str = _name.charAt(_name.length - 1);
      const hasLast = _name.length >= 3;
      const mask_length =
        _name.length <= 1 ? 0 : _name.length === 2 ? 1 : _name.length - 2;

      let result = '';
      result = result + start_str;
      result = result + ''.padStart(mask_length, '*');
      if (hasLast) {
        result = result + last_str;
      }
      return result;
    }
  },
  // _phone 010-2222-2222
  phone: (_phone: string) => {
    const digests = _phone.split('-');
    if (typeof digests[1] === 'string') {
      digests[1] = ''.padStart(digests[1].length, '*');
    }
    return digests.join('-');
  },
  id: (_id: string) => {
    let result = '';
    if (_id.length <= 3) {
      result = _id;
      result = result.substring(0, result.length - 1) + '*';
    } else {
      const front = _id.slice(0, 3);
      result = front + ''.padStart(_id.length - 3, '*');
    }
    return result;
  },
  email: (_email: string) => {
    const [front, back] = _email.split('@');
    let result = '';
    const masked_front = mask.id(front);
    const [addr_front, ...rest] = back.split('.');
    const masked_addr_front = mask.id(addr_front);
    const masked_addr = [masked_addr_front].concat(...rest).join('.');
    result = masked_front + '@' + masked_addr;
    return result;
  },
};

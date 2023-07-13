export default function AppendFormData(fd, key, value) {
  if (typeof value === 'undefined' || value === null) {
    return;
  }
  if (value instanceof Array) {
    value.forEach((item, i) => {
      AppendFormData(fd, `${key}[${i}]`, item);
    });
  } else if (value instanceof File) {
    console.warn(
      'AppendFormData를 통해서 파일을 넣는경우 동작을 보장할 수 없습니다.'
    );
    const converted_key = key.replace(/(\[.*\])$/, '');
    fd.append(converted_key, value);
  } else if (typeof value === 'object') {
    Object.entries(value).forEach(([field, data]) => {
      AppendFormData(fd, `${key}[${field}]`, data);
    });
  } else {
    fd.append(key, value);
  }
}

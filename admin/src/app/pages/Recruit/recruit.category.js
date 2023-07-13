export const recruitToStr = {
  new_recruits: '신입',
  career: '경력',
  regualr: '상시',
  occasional: '수시',
  intern: '인턴',
};

export const recruitListData = Object.entries(recruitToStr).map(
  ([field, value]) => {
    return { label: value, value: field };
  }
);

export const userTypeToStr = {
  개인: '개인',
  법인: '법인',
  단체: '단체',
};

export const userTypeListData = Object.entries(userTypeToStr).map(
  ([field, value]) => {
    return { label: value, value: field };
  },
);

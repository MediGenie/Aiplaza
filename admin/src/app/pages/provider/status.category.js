export const statusToStr = {
  승인: '승인',
  거절: '거절',
};

export const statusListData = Object.entries(statusToStr).map(
  ([field, value]) => {
    return { label: value, value: field };
  },
);

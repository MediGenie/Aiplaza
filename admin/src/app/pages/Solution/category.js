export const CategoryList = [
  { label: '네트워크·클라우드네이티브', value: 'network_cloud_native' },
  { label: '시스템(DB·서버)', value: 'system_db_server' },
  { label: '컴플라이언스·취약점 관리', value: 'complience' },
  { label: '기타', value: 'etc' },
];

export const CategoryToStr = {};
CategoryList.forEach((v) => (CategoryToStr[v.value] = v.label));

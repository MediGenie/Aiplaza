export const DEFAULT_PAGE_PATH = '/home';

export const StatusCategory = {
  NOT_INPUT: 'NOT_INPUT', // 미입력
  REQUEST: 'REQUEST', // 승인요청
  REJECT: 'REJECT', // 승인취소
  GRANTED: 'GRANTED', // 승인
};

export const StatusCategoryConvert = (str) => {
  switch (str) {
    case StatusCategory.NOT_INPUT:
      return '미입력';
    case StatusCategory.REQUEST:
      return '승인요청';
    case StatusCategory.REJECT:
      return '승인취소';
    case StatusCategory.GRANTED:
      return '승인';
    default:
      return '알수없음';
  }
};

export const MajorCategory = {
  ChildEducation: 'ChildEducation',
  ElemantaryEducation: 'ElemantaryEducation',
  MiddleEducation: 'MiddleEducation',
  HighEducation: 'HighEducation',
  HighEntranceEducation: 'HighEntranceEducation',
  UniversityEntranceEducation: 'UniversityEntranceEducation',
  etc_text: 'etc_text',
};

export const MajorCategoryConvert = (str) => {
  switch (str) {
    case MajorCategory.ChildEducation:
      return '유아학습';
    case MajorCategory.ElemantaryEducation:
      return '초등학습';
    case MajorCategory.MiddleEducation:
      return '중등학습';
    case MajorCategory.HighEducation:
      return '고등학습';
    case MajorCategory.HighEntranceEducation:
      return '고교입시';
    case MajorCategory.UniversityEntranceEducation:
      return '대학입시';
    case MajorCategory.etc_text:
      return '기타';
    default:
      return '알수없음';
  }
};

export const EditContentsCategory = {
  IntroductionInfo: 'IntroductionInfo', // 전문가 소개
  ProductInfo: 'ProductInfo', // 상품 관리
  PaymentInfo: 'PaymentInfo', // 정산정보 관리
};

export const EditContentsCategoryConvert = (str) => {
  switch (str) {
    case EditContentsCategory.IntroductionInfo:
      return '전문가 소개';
    case EditContentsCategory.ProductInfo:
      return '상품 관리';
    case EditContentsCategory.PaymentInfo:
      return '정산정보 관리';
    default:
      return '알수없음';
  }
};

export const ConsultStatus = {
  Booking: 'booking', // 예약 요청중
  BookCanceled: 'bookCanceled', // 예약 취소
  ConsultCanceled: 'consultCanceled', // 상담 취소
  Booked: 'booked', // 예약완료
  Consulted: 'consulted', // 상담완료
};

export const MainCategory = {
  SPECIFICATION: 'SPECIFICATION',
  TRANSLATION: 'TRANSLATION',
  DRAWING: 'DRAWING',
};

export const Sub1stCategory = {
  ELECTRONIC: 'ELECTRONIC',
  CHEMISTRY: 'CHEMISTRY',
  BIOTECHNOLOGY: 'BIOTECHNOLOGY',
  MACHINE: 'MACHINE',
  TRANS_KR_TO_EN: 'TRANS_KR_TO_EN',
  TRANS_KR_TO_JP: 'TRANS_KR_TO_JP',
  TRANS_KR_TO_CN: 'TRANS_KR_TO_CN',
  ETC: 'ETC',
  PATENT: 'PATENT',
  DESIGN: 'DESIGN',
  OVERSEAS_DRAWINGS: 'OVERSEAS_DRAWINGS',
};

export const MainCategoryConvert = (str) => {
  switch (str) {
    case MainCategory.DRAWING:
      return '도면';
    case MainCategory.SPECIFICATION:
      return '명세서';
    case MainCategory.TRANSLATION:
      return '번역';
    default:
      return '알수없음';
  }
};

export const Sub1stCategoryConvert = (str) => {
  switch (str) {
    case Sub1stCategory.BIOTECHNOLOGY:
      return '바이오';
    case Sub1stCategory.CHEMISTRY:
      return '화학';
    case Sub1stCategory.ELECTRONIC:
      return '전기전자';
    case Sub1stCategory.MACHINE:
      return '기계';
    case Sub1stCategory.TRANS_KR_TO_CN:
      return '한↔중';
    case Sub1stCategory.TRANS_KR_TO_EN:
      return '한↔영';
    case Sub1stCategory.TRANS_KR_TO_JP:
      return '한↔일';
    case Sub1stCategory.ETC:
      return '기타';
    case Sub1stCategory.PATENT:
      return '특허';
    case Sub1stCategory.DESIGN:
      return '디자인';
    case Sub1stCategory.OVERSEAS_DRAWINGS:
      return '해외도면';
    default:
      return '알수없음';
  }
};

export const WorkRequestStatus = {
  not_accept: 'not_accept',
  in_progress: 'in_progress',
  done: 'done',
};

export const WorkRequestStatusConvert = (str) => {
  switch (str) {
    case WorkRequestStatus.done:
      return '완료';
    case WorkRequestStatus.not_accept:
      return '진행전';
    case WorkRequestStatus.in_progress:
      return '진행중';
    default:
      return '알수없음';
  }
};

export const ExpertSubDomainConvert = (
  domain,
  sub_domain_1_price,
  sub_domain_2_price,
  sub_domain_3_price,
  sub_domain_4_price,
) => {
  const result = [];
  if (domain === MainCategory.DRAWING) {
    sub_domain_1_price && result.push('특허');
    sub_domain_2_price && result.push('디자인');
    sub_domain_3_price && result.push('해외도면');
  } else if (domain === MainCategory.SPECIFICATION) {
    sub_domain_1_price && result.push('전기전자');
    sub_domain_2_price && result.push('화학');
    sub_domain_3_price && result.push('바이오');
    sub_domain_4_price && result.push('기계');
  } else if (domain === MainCategory.TRANSLATION) {
    sub_domain_1_price && result.push('한↔영');
    sub_domain_2_price && result.push('한↔일');
    sub_domain_3_price && result.push('한↔중');
    sub_domain_4_price && result.push('기타');
  } else {
    result.push('-');
  }
  return result;
};

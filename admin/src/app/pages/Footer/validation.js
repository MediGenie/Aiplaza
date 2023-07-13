import * as yup from 'yup';
export const footerYup = yup.object().shape({
  image: yup.mixed().required('이미지를 업로드해 주세요.'),
  presenter: yup.string().required('대표이사를 입력해 주세요.'),
  biz_register_number: yup.string().required('사업자등록번호를 입력해 주세요.'),
  address: yup.string().required('주소를 입력해 주세요.'),
  mail_order_sales_report_number: yup
    .string()
    .required('통신판매신고번호 입력해 주세요.'),
  phone: yup.string().required('대표전화를 입력해 주세요.'),
  fax: yup.string().required('팩스번호를 입력해 주세요.'),
  sns: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('SNS명을 입력해 주세요.'),
        link: yup
          .string()
          .url('URL 형식으로 입력해 주세요.')
          .required('SNS URL을 입력해 주세요.'),
        image: yup.mixed().required('SNS 로고 이미지를 업로드해 주세요.'),
      })
    )
    .min(1, 'SNS 정보를 최소 1개 이상 입력해주세요.')
    .required('SNS 정보를 입력해주세요.'),
  family: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('사이트명을 입력해 주세요.'),
        link: yup
          .string()
          .required('사이트 URL을 입력해 주세요.')
          .url('URL 형식으로 입력해 주세요.'),
      })
    )
    .min(1, '패밀리사이트를 최소 1개 이상 입력해 주세요.')
    .required('패밀리사이트를 입력해 주세요.'),

  privacyTermLink: yup.string().url('URL 형식으로 입력해 주세요.'),
});

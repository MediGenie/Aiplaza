export const PaymentStatusFormatter = (data) => {
  switch (data) {
    case 'ready': {
      return '결제준비';
    }
    case 'paid': {
      return '결제완료';
    }
    case 'cancelled': {
      return '결제취소';
    }
    case 'failed': {
      return '결제실패';
    }
    default:
      return '알수없음';
  }
};

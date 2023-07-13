import React, { useCallback, useState } from 'react';
import { Container } from 'reactstrap';
import { HeaderMain } from '@core/routes/components/HeaderMain';

import DefaultModal from '../../../@core/components/Modals';
import PlaceHolderEdit from './PlaceholderEdit';

export default function Placeholder() {
  const [modalinfo, setModalinfo] = useState({
    show: false,
    message: '',
  });
  const closeModal = useCallback(() => {
    setModalinfo((prev) => ({ ...prev, show: false }));
  }, []);

  return (
    <div className="ml-3">
      <HeaderMain title="작성 가이드 관리" className="mb-4 mt-2" />
      <Container>
        <PlaceHolderEdit type="basic" slug="basic" />
        <PlaceHolderEdit type="estimate" slug="estimate" />
        <PlaceHolderEdit type="complience" slug="complience" />
      </Container>
      <DefaultModal
        headerMessage="알림"
        bodyMessage={modalinfo.message}
        ButtonMessage="확인"
        isOpen={modalinfo.show}
        closeFunc={closeModal}
      />
    </div>
  );
}

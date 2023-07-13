import React, { useCallback, useState } from 'react';
import { Container } from 'reactstrap';
import { HeaderMain } from '@core/routes/components/HeaderMain';
import DefaultModal from '../../../@core/components/Modals';

import WriteGuide from './WriteGuide';

export default function Guide() {
  const [modalinfo, setModalinfo] = useState({
    show: false,
    message: '',
  });
  const closeModal = useCallback(() => {
    setModalinfo((prev) => ({ ...prev, show: false }));
  }, []);

  return (
    <div className="ml-3">
      <HeaderMain title="클라우드 견적 가이드 관리" className="mb-4 mt-2" />
      <Container>
        <WriteGuide type="estimate" slug="estimate" />
        <WriteGuide type="estimate_mobile" slug="estimate_mobile" />
      </Container>

      <HeaderMain
        title="클라우드 견적 작성 가이드 관리"
        className="mb-4 mt-2"
      />
      <Container>
        <WriteGuide type="system" slug="system" />
        <WriteGuide type="storage" slug="storage" />
        <WriteGuide type="network" slug="network" />
        <WriteGuide type="secure" slug="secure" />
      </Container>
      <HeaderMain
        title="클라우드 컴플라이언스 가이드 관리"
        className="mb-4 mt-2"
      />
      <Container>
        <WriteGuide type="complience" slug="complience" />
        <WriteGuide type="complience_mobile" slug="complience_mobile" />
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

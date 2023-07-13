import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@core/components';
import { HeaderMain } from '@core/routes/components/HeaderMain';
import { useHistory, useRouteMatch } from 'react-router-dom';
import DefaultModal from '@core/components/Modals';
import { useCoreContext } from './useCoreContext';

function Detail({ Form, edit, header }) {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState(null);
  const history = useHistory();
  const match = useRouteMatch();
  const [modalInfo, setModalInfo] = useState({
    visible: false,
    message: '',
  });
  const service = useCoreContext();
  const fetchData = useCallback(
    (_id) => {
      service
        .getOne(_id)
        .then((row) => {
          setData(row);
          setIsReady(true);
        })
        .catch(() => {
          setModalInfo({ visible: true, message: '잘못된 접근입니다.' });
        });
    },
    [service]
  );

  useEffect(() => {
    const { _id } = match.params;
    if (match.url === `/${service.apiName}/create`) return;
    fetchData(_id);
  }, [fetchData, match.params, match.url, service.apiName]); // match, apiName

  if (!isReady)
    return (
      <>
        <DefaultModal
          headerMessage="404 오류"
          bodyMessage={modalInfo.message}
          isOpen={modalInfo.visible}
          closeFunc={() => {
            setModalInfo({ visible: false, message: '' });
          }}
          onCloseEvent={() => {
            history.push(`/${service.apiName}`);
          }}
          ButtonMessage="닫기"
        />
      </>
    );

  return (
    <Container className="list-container">
      <HeaderMain
        title={`${
          header.includes(' 관리') ? header.replace(' 관리', '') : header
        } 상세`}
        className="mb-4 mt-2"
      />
      <Container>
        <Form
          formType="detail"
          initialData={data}
          apiName={service.apiName}
          disableEdit={!edit}
        />
      </Container>
    </Container>
  );
}

Detail.propTypes = {
  Form: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  edit: PropTypes.bool,
  header: PropTypes.string,
};
Detail.defaultProps = {
  edit: false,
  header: '',
};

export default Detail;

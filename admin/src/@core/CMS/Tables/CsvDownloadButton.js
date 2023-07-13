import React, { useCallback, useRef, useState } from 'react';
import { Button } from 'reactstrap';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { NotificationModal } from '@core/components/Modals';
import { getTodayFromDateToString } from '@core/utils/timeService';

// eslint-disable-next-line react/prop-types
function CsvDownloadButton({ apiName, csvRef }) {
  const location = useLocation();
  const [data, setData] = useState('');
  const [fileName, setFileName] = useState('');
  const [modalState, setModalState] = useState({
    visible: false,
    isSuccess: null,
    message: '',
  });

  const csvLink = useRef();

  const closeModal = useCallback(
    () => setModalState({ visible: false, isSuccess: null, message: '' }),
    []
  );
  const getCsvData = useCallback(async () => {
    setModalState({
      visible: true,
      isSuccess: null,
      message: '다운로드를 시작합니다.',
    });

    const search = location.search.split('&');
    try {
      const response = await axios.get(
        `/${apiName}/download-csv?${search[1]}&${search[2]}`
      );
      // console.log('불러오기 성공', response.data.csv);
      const todayString = getTodayFromDateToString();
      const fileNameWithTime =
        apiName === 'music'
          ? `${todayString}_곡 관리 목록.csv`
          : `${todayString}_컬렉션 관리 목록.csv`;
      setFileName(fileNameWithTime);
      setData(response.data.csv);
      // 출처: https://github.com/react-csv/react-csv/issues/72#issuecomment-421160842
      csvLink.current.link.click();
      setModalState({
        visible: true,
        isSuccess: true,
        message: '다운로드를 완료했습니다.',
      });
    } catch (error) {
      setModalState({
        visible: true,
        isSuccess: false,
        message: '다운로드를 실패했습니다.',
      });
      console.log('error', error);
    }
  }, [apiName, location.search]);

  return (
    <>
      <Button
        style={{ fontSize: '1.15em' }}
        color="success"
        className="mr-2"
        onClick={getCsvData}
        hidden={apiName === 'collection'}
        ref={csvRef}
      >
        csv 다운로드
      </Button>
      <CSVLink
        data={data}
        filename={fileName}
        className="hidden"
        ref={csvLink}
        target="__blank"
        separator=","
        enclosingCharacter={``}
      />
      <NotificationModal
        successMessage={modalState.message}
        failedMessage={modalState.message}
        isSuccess={modalState.isSuccess}
        isOpen={modalState.visible}
        closeFunc={closeModal}
        onSuccessEvent={() => {}}
      />
    </>
  );
}

export default CsvDownloadButton;

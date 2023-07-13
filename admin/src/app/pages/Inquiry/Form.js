import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, CardBody } from '@core/components';

import BootstrapTable from 'react-bootstrap-table-next';
import {
  CategoryEnumToStr,
  CloudEnumToStr,
  IndustryEnumToStr,
  MonitOrComplienceEnumToStr,
  NetworkResourceEnumToStr,
  SecureResourceEnumToStr,
  StorageResourceTypeEnumToStr,
} from './enumToStr';
import DefaultModal, { ConfirmModal } from '../../../@core/components/Modals';
import { TextInput } from '../components/form/TextInput';
import { useCoreContext } from '../../../@core/CMS/useCoreContext';
import { VerifyOtpModal } from '../../Otp/VerifyOtpModal';
import TextArea from '../components/form/TextArea/TextArea';

const initDataPropTypes = PropTypes.any;

function FormComponent({ initialData }) {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(initialData);
  }, [initialData]);
  const service = useCoreContext();
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [openError, setOpenError] = useState(false);
  const route = useRouteMatch();
  const handleCloseOtp = useCallback(() => {
    setOpenOtp(false);
  }, []);
  const handleOpenOtp = useCallback(() => {
    setOpenOtp(true);
  }, []);
  const handleSubmit = useCallback(
    async (otp_token) => {
      try {
        const response = await service.getOne(route.params._id, otp_token);
        // 성공처리
        setData(response);
        setOpenOtp(false);
        setVerifyOtp(true);
      } catch (e) {
        // 실패처리
        setOpenError(true);
      }
    },
    [route.params._id, service]
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [inDeleteProcess, setInDeleteProcess] = useState(false);
  const [errorModalInfo, setErrorModalInfo] = useState({
    show: false,
    message: '',
  });
  const deleteHandler = useCallback(async () => {
    setInDeleteProcess(true);
    setShowDeleteModal(false);
    try {
      await service.delete(initialData._id);
      history.goBack();
    } catch (e) {
      setErrorModalInfo({
        show: true,
        message: '항목을 삭제하는데 오류가 발생하였습니다.',
      });
    } finally {
      setInDeleteProcess(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData._id]);
  const history = useHistory();

  const onCancel = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <>
      {verifyOtp === false && (
        <div className="text-right">
          <Button color="primary" type="button" onClick={handleOpenOtp}>
            마스킹 해제하기
          </Button>
          <VerifyOtpModal
            open={openOtp}
            onClose={handleCloseOtp}
            onSubmit={handleSubmit}
          />
          <DefaultModal
            headerMessage="오류"
            bodyMessage="인증에 실패하였습니다."
            ButtonMessage="닫기"
            isOpen={openError}
            closeFunc={() => setOpenError(false)}
          />
        </div>
      )}
      <Card className="my-3 custom-card">
        <CardBody>
          <TextInput
            disabled
            label="모집분야"
            value={CategoryEnumToStr[data.category] || data.category}
          />
          <TextArea disabled label="문의내용" value={data.content} />
          <TextInput disabled label="회사명" value={data.company} />
          <TextInput
            disabled
            label="업종"
            value={IndustryEnumToStr[data.industry]}
          />
          <TextInput disabled label="성명" value={data.name} />
          <TextInput disabled label="이메일" value={data.email} />
          <TextInput disabled label="연락처" value={data.tel} />
          <TextInput disabled label="부서" value={data.department} />
          <TextInput
            disabled
            label="개인정보 수집 · 이용 동의"
            value={data.personal_use_agree ? 'Y' : 'N'}
          />
          <TextInput
            disabled
            label="마케팅 활용에 대한 수집 · 이용 동의"
            value={data.marketting_agree ? 'Y' : 'N'}
          />
          {data.category === 'cloud_estimate' && (
            <>
              <TextInput
                disabled
                label="사용 희망 클라우드"
                value={CloudEnumToStr[data.wanted_cloud_partner]}
              />
              <TextInput
                disabled
                label="현재 클라우드 서비스 이용 여부"
                value={
                  CloudEnumToStr[data.current_use_cloud] ||
                  data.current_use_cloud_etc
                }
              />
              <TextInput
                disabled
                label="관제/컴플라이언스 대응 필요 여부"
                value={MonitOrComplienceEnumToStr[data.monit_or_complience]}
              />
              <TextInput
                disabled
                label="현재 MSP(매니지드)서비스 이용 여부"
                value={data.current_use_MSP ? 'YES' : 'NO'}
              />
              <TextInput
                disabled
                label="이용중인 MSP 서비스 업체명"
                value={data.current_use_MSP_partner}
              />
            </>
          )}
        </CardBody>
      </Card>
      {data.category === 'cloud_estimate' && (
        <>
          <h3 className="mb-3">견적내용</h3>
          <div>
            <p>1. 시스템 리소스 정보</p>
            <BootstrapTable
              keyField="index"
              classes="custom-table"
              data={data.systemResource}
              columns={[
                {
                  dataField: 'index',
                  text: 'No.',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                },
                {
                  dataField: 'os',
                  text: 'OS',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                },
                {
                  dataField: 'amount',
                  text: '수량',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell) => (cell === 0 ? '-' : cell),
                },
                {
                  dataField: 'cpu',
                  text: 'vCPU',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell) => (cell === 0 ? '-' : cell),
                },
                {
                  dataField: 'memory',
                  text: '메모리',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                },
                {
                  dataField: 'disk_type',
                  text: '디스크 타입',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                },
                {
                  dataField: 'disk_storage',
                  text: '디스크 용량',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell, row) => {
                    if (row.disk_storage_type) {
                      return `${cell} ${row.disk_storage_type}`;
                    }
                    return `${cell}`;
                  },
                },
                {
                  dataField: 'text',
                  text: '비고',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell) => cell || '-',
                },
              ]}
            />
          </div>
          <div>
            <p>2. 스토리지 리소스 정보</p>
            <BootstrapTable
              keyField="index"
              classes="custom-table"
              data={data.storageResource}
              columns={[
                {
                  dataField: 'index',
                  text: 'No.',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                },
                {
                  dataField: 'type',
                  text: '구분',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell, row) =>
                    StorageResourceTypeEnumToStr[cell] || row.type_etc,
                },
                {
                  dataField: 'capacity',
                  text: '용량',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell, row) => {
                    if (row.disk_storage) {
                      return `${row.disk_storage} ${cell}`;
                    }
                    return cell;
                  },
                },
                {
                  dataField: 'text',
                  text: '비고',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell) => cell || '-',
                },
              ]}
            />
          </div>
          <div>
            <p>3. 네트워크 리소스 정보</p>
            <BootstrapTable
              keyField="index"
              classes="custom-table"
              data={data.networkResource}
              columns={[
                {
                  dataField: 'index',
                  text: 'No.',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                },
                {
                  dataField: 'type',
                  text: '구분',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell, row) =>
                    NetworkResourceEnumToStr[cell] || row.type_etc,
                },
                {
                  dataField: 'amount',
                  text: '수량',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                },
                {
                  dataField: 'text',
                  text: '비고',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell) => cell || '-',
                },
              ]}
            />
          </div>
          <div>
            <p>4. 보안 리소스 정보</p>
            <BootstrapTable
              keyField="index"
              classes="custom-table"
              data={data.secureResource}
              columns={[
                {
                  dataField: 'index',
                  text: 'No.',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                },
                {
                  dataField: 'type',
                  text: '구분',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell, row) =>
                    SecureResourceEnumToStr[cell] || row.type_etc,
                },
                {
                  dataField: 'text',
                  text: '비고',
                  align: 'center',
                  headerAlign: 'center',
                  sort: false,
                  formatter: (cell) => cell || '-',
                },
              ]}
            />
          </div>
        </>
      )}
      <div className="d-flex justify-content-end mt-3 mb-3">
        <Button
          className="mr-3"
          type="button"
          onClick={onCancel}
          disabled={inDeleteProcess}
        >
          취소
        </Button>
        <Button
          color="warning"
          type="button"
          onClick={() => {
            setShowDeleteModal(true);
          }}
          disabled={inDeleteProcess}
        >
          삭제
        </Button>
        <ConfirmModal
          isOpen={showDeleteModal}
          headerMessage="항목 삭제"
          bodyMessage={
            <>
              해당 항목을 삭제하시겠습니까?
              <br />
              삭제 시 데이터 복구는 불가능합니다.
            </>
          }
          okButtonMessage="삭제"
          cancelButtonMessage="취소"
          onOkButtonHandler={deleteHandler}
          onCancelButtonHandler={() => setShowDeleteModal(false)}
        />
        <DefaultModal
          bodyMessage={errorModalInfo.message}
          headerMessage="오류"
          isOpen={errorModalInfo.show}
          closeFunc={() => {
            setErrorModalInfo((prev) => ({ ...prev, show: false }));
          }}
          ButtonMessage="닫기"
        />
      </div>
    </>
  );
}

FormComponent.propTypes = {
  formType: PropTypes.string,
  initialData: initDataPropTypes,
  onSubmit: PropTypes.func,
  disableEdit: PropTypes.bool,
  validate: PropTypes.any,
};

FormComponent.defaultProps = {
  formType: 'detail',
  initialData: {},
  onSubmit: () => {},
  disableEdit: false,
};

export default FormComponent;

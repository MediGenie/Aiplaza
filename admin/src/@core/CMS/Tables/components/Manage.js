import React, { Fragment, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useCoreContext } from '../../useCoreContext';
import { useHistory } from 'react-router-dom';
import DefaultModal, { ConfirmModal } from '../../../components/Modals';

export default function Manage({
  row,
  disabled,
  detail,
  edit,
  deletable,
  reload,
}) {
  const service = useCoreContext();
  const history = useHistory();
  const [defaultModal, setDefaultModal] = useState({
    show: false,
    header: '',
    message: '',
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const acceptDelete = useCallback(() => {
    service
      .delete(row._id)
      .then(() => {
        setDeleteModal(false);
        reload();
      })
      .catch((e) => {
        const bodyMessage = e?.response?.data
          ? e?.response?.data
          : '항목을 삭제하는데 문제가 발생하였습니다. 새로고침 후 이용해주세요.';
        setDeleteModal(false);
        setDefaultModal({
          visible: true,
          header: '삭제 실패',
          message: bodyMessage,
        });
      });
  }, [reload, row._id, service]);
  const cancelDelete = useCallback(() => {
    setDeleteModal(false);
  }, []);
  const onClickView = useCallback(() => {
    const next = `/${service.apiName}/${row._id}`;
    history.push(next);
  }, [history, row._id, service.apiName]);
  const onClickEdit = useCallback(() => {
    const next = `/${service.apiName}/${row._id}/edit`;
    history.push(next);
  }, [history, row._id, service.apiName]);
  const onDeleteRow = useCallback(() => {
    setDeleteModal(true);
  }, []);
  if (disabled === true) {
    return null;
  }
  return (
    <Fragment>
      {detail === true && (
        <Button
          className="mx-1 cell-button"
          type="button"
          onClick={onClickView}
        >
          보기
        </Button>
      )}
      {edit === true && (
        <Button
          className="mx-1 cell-button"
          type="button"
          onClick={onClickEdit}
        >
          수정
        </Button>
      )}
      {deletable === true && (
        <Button
          className="mx-1 cell-button"
          type="button"
          onClick={onDeleteRow}
        >
          삭제
        </Button>
      )}
      {deletable === true && (
        <ConfirmModal
          isOpen={deleteModal}
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
          onOkButtonHandler={acceptDelete}
          onCancelButtonHandler={cancelDelete}
        />
      )}
      <DefaultModal
        isOpen={defaultModal.show}
        bodyMessage={defaultModal.message}
        headerMessage={defaultModal.header}
        ButtonMessage="확인"
        closeFunc={() => setDefaultModal((prev) => ({ ...prev, show: false }))}
      />
    </Fragment>
  );
}
Manage.propTypes = {
  row: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  detail: PropTypes.bool,
  edit: PropTypes.bool,
  deletable: PropTypes.bool,
  reload: PropTypes.func.isRequired,
};
Manage.defaultProps = {
  disabled: false,
  detail: true,
  edit: true,
  deletable: true,
};
